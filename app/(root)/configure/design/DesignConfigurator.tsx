"use client"

import HandleComponent from "@/components/HandleComponent"
import PhoneCase from "./PhoneCase"
import PhoneCaseConfig from "./PhoneCaseConfig"

import { useToast } from "@/components/ui/use-toast"

import { COLORS, MODELS, MATERIALS, FINISHES } from "@/validators/option-validator"
import { saveConfigToDb, SaveConfigArgs } from "@/actions/actions"

import NextImage from 'next/image'
import { useRef, useState } from "react"
import { useRouter } from "next/navigation"

import { Rnd } from 'react-rnd'
import { useUploadThing } from "@/lib/uploadthing"
import { useMutation } from "@tanstack/react-query"


interface DesignConfiguratorProps {
  configId: string
  imageUrl: string
  imageDimensions: { width: number; height: number }
}

const DesignConfigurator = ({ configId, imageUrl, imageDimensions}: DesignConfiguratorProps) => {
  const { toast } = useToast()
  const router = useRouter()

  const { mutate: saveConfig, isPending } = useMutation({
    mutationKey: ['save-config'],
    mutationFn: async (args: SaveConfigArgs) => {
      await Promise.all([
        saveConfiguration(), 
        saveConfigToDb(args),
      ])
    },
    onError: () => {
      toast({
        title: 'Something went wrong',
        description: 'There was an error. Please try again.',
        variant: 'destructive',
      })
    },
    onSuccess: () => {
      router.push(`/configure/preview?id=${configId}`)
    },
  })

  const [options, setOptions] = useState<{
    color: (typeof COLORS)[number]
    model: (typeof MODELS.options)[number]
    material: (typeof MATERIALS.options)[number]
    finish: (typeof FINISHES.options)[number]
  }>({
    color: COLORS[0],
    model: MODELS.options[0],
    material: MATERIALS.options[0],
    finish: FINISHES.options[0],
  })

  // Image dimension
  const [renderedDimension, setRenderedDimension] = useState({
    width: imageDimensions.width / 4,
    height: imageDimensions.height / 4,
  })

  const [renderedPosition, setRenderedPosition] = useState({
    x: 150,
    y: 205,
  })

  // 儲存新圖片設定
  const containerRef = useRef<HTMLDivElement>(null)
  const phoneCaseRef = useRef<HTMLDivElement>(null)

  const { startUpload } = useUploadThing('imageUploader')

  async function saveConfiguration() {
    try {
      const {
        left: caseLeft,
        top: caseTop,
        width,
        height,
      } = phoneCaseRef.current!.getBoundingClientRect()

      const { left: containerLeft, top: containerTop 
      } = containerRef.current!.getBoundingClientRect()

      const leftOffset = caseLeft - containerLeft
      const topOffset = caseTop - containerTop
      // 找出左上角, 設為(原點(0,0)
      const actualX = renderedPosition.x - leftOffset
      const actualY = renderedPosition.y - topOffset
      // 設定手機區域
      const canvas = document.createElement('canvas')
      canvas.width = width
      canvas.height = height
      
      const ctx = canvas.getContext('2d')

      const userImage = new Image()
      userImage.crossOrigin = 'anonymous'
      userImage.src = imageUrl
      await new Promise((resolve) => (userImage.onload = resolve))

      //取得圖所有資訊
      ctx?.drawImage(
        userImage,
        actualX,
        actualY,
        renderedDimension.width,
        renderedDimension.height
      )
      // html轉換成圖片
      const base64 = canvas.toDataURL()
      const base64Data = base64.split(',')[1]
      const blob = base64ToBlob(base64Data, 'image/png')

      const now = new Date();
      const year = now.getFullYear();
      const month = String(now.getMonth() + 1).padStart(2, '0');
      const day = String(now.getDate()).padStart(2, '0');
      // uploadthing更新現在的 configId
      const file = new File([blob], `${year}${month}${day}_ImageConfig.png`, { type: 'image/png' })
      await startUpload([file], { configId })
    } catch (error) {
      toast({
        title: 'Failed to save new image',
        description:
          'There was a problem saving your new image config, please try again.',
        variant: 'destructive',
      })
    }
  }

  function base64ToBlob(base64: string, mimeType: string) {
    const byteCharacters = atob(base64)
    const byteNumbers = new Array(byteCharacters.length)
    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i)
    }
    const byteArray = new Uint8Array(byteNumbers)
    return new Blob([byteArray], { type: mimeType })
  }

  return (
    <div className='relative mt-20 grid grid-cols-1 lg:grid-cols-3 mb-20 pb-20'>
      <div ref={containerRef} className='design-area'>
        {/* Template */}
        <PhoneCase 
          phoneCaseRef={phoneCaseRef}
          color={options.color.color}
        />

        {/* From uploadthing image */}
        <Rnd
          default={{
            x: 150,
            y: 205,
            height: imageDimensions.height / 4,
            width: imageDimensions.width / 4,
          }}
          lockAspectRatio
          resizeHandleComponent={{
            bottomRight: <HandleComponent />,
            bottomLeft: <HandleComponent />,
            topRight: <HandleComponent />,
            topLeft: <HandleComponent />,
          }}
          onResizeStop={(_, __, ref, ___, {x,y}) =>{
            setRenderedDimension({
              height: parseInt(ref.style.height.slice(0, -2)),
              width: parseInt(ref.style.width.slice(0, -2)),
            })

            setRenderedPosition({ x, y })
          }}
          onDragStop={(_, data) => {
            const { x, y } = data
            setRenderedPosition({ x, y })
          }}
        >
          <div className='relative w-full h-full'>
            <NextImage
              src={imageUrl}
              fill
              alt='your image'
              className='pointer-events-none'
            />
          </div>
        </Rnd>
      </div>

      {/* Right side area config */}
      <PhoneCaseConfig
        options={options}
        setOptions={setOptions}
        saveConfig={saveConfig}
        configId={configId}
        isPending={isPending}
      />
    </div>
  )
}

export default DesignConfigurator