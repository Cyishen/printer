import NextImage from 'next/image'
import { cn } from "@/lib/utils"
import { AspectRatio } from "@/components/ui/aspect-ratio"

interface Props {
  color: string;
  TShirtRef: React.RefObject<HTMLDivElement>;
}

const TShirt = ({ TShirtRef, color }: Props) => {

  return (
    <>
      <div className='relative w-60 bg-opacity-50 pointer-events-none aspect-[480/550]'>
        <AspectRatio
          ref={TShirtRef}
          ratio={480 / 550}
          className='relative w-full pointer-events-none aspect-[480/550] z-50'
        >
          <NextImage
            fill
            alt='image'
            src='/t-shirt-template.png'
            className='pointer-events-none z-50 select-none'
          />
        </AspectRatio>
        {/* 範圍陰影 */}
        <div className='design-area-cover-for-t-shirt' />
        {/* 商品背景顏色 */}
        {/* <div
          style={{ backgroundColor: color }} 
          className={cn(
            'absolute inset-0 left-[3px] top-px right-[3px] bottom-px rounded-[32px]'
          )}
        /> */}
      </div>
    </>
  )
}

export default TShirt