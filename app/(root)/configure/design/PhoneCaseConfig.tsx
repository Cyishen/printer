import { ScrollArea } from "@/components/ui/scroll-area"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, } from '@/components/ui/dropdown-menu'

import { ArrowRight, Check, ChevronsUpDown } from 'lucide-react'
import { cn, getPriceWithLocale, CurrencyProps } from "@/lib/utils"

import { COLORS, MODELS, MATERIALS, FINISHES } from "@/validators/option-validator"
import { BASE_PRICE } from "@/config/products"
import { SaveConfigArgs } from "@/actions/actions"

import { useEffect, useState } from "react"

import { Radio, RadioGroup, Description } from '@headlessui/react'

interface Props {
  isPending?: boolean;
  configId: string;
  saveConfig: (variables: SaveConfigArgs) => void;
  options: {
    color: (typeof COLORS)[number];
    model: (typeof MODELS.options)[number];
    material: (typeof MATERIALS.options)[number];
    finish: (typeof FINISHES.options)[number];
  };
  setOptions: React.Dispatch<
    React.SetStateAction<{
      color: (typeof COLORS)[number];
      model: (typeof MODELS.options)[number];
      material: (typeof MATERIALS.options)[number];
      finish: (typeof FINISHES.options)[number];
    }>
  >;
}

const PhoneCaseConfig = ({ saveConfig, configId, isPending, options, setOptions }: Props) => {
    const [userLocale, setUserLocale] = useState<string>('en-US');
    const [userCurrency, setUserCurrency] = useState<CurrencyProps>('USD');
  
    useEffect(() => {
      const locale = navigator.language || 'en-US';
      setUserLocale(locale);
  
      if (locale === 'zh-TW') {
        setUserCurrency('TWD');
      } else if (locale === 'en-US') {
        setUserCurrency('USD');
      }
    }, []);

  return (
    <div className="h-[37.5rem] w-full col-span-full lg:col-span-1 flex flex-col">
    <ScrollArea className='relative flex-1 overflow-auto'>
      <div className='px-8 pb-12 pt-8'>
        <h2 className='tracking-tight font-bold text-3xl'>
          Customize your case
        </h2>

        <div className='w-full h-px bg-zinc-200 my-6' />

        <div className='relative mt-4 h-full flex flex-col justify-between'>
          <div className='flex flex-col gap-6'>
            {/* Color */}
            <RadioGroup
              value={options.color}
              onChange={(val) => {
                setOptions((prev) => ({
                  ...prev,
                  color: val,
                }))
              }}
            >
              <Label>{options.color.label}</Label>

              <div className='mt-3 flex items-center space-x-3'>
                {COLORS.map((color) => (
                  <Radio
                    key={color.label}
                    value={color}
                    className={cn(
                        'relative -m-0.5 flex cursor-pointer items-center justify-center p-0.5 active:ring-0 focus:ring-0 active:outline-none focus:outline-none border-2 border-transparent',
                    )}
                  >
                    <span
                      style={{ backgroundColor: color.color }} 
                      className={cn(
                        'h-8 w-8 rounded-full border border-black border-opacity-10',
                      )}
                    />
                    
                    {options.color.label === color.label && (
                      <span className="absolute -inset-0.5 border-2 border-blue-500 rounded-full pointer-events-none"></span>
                    )}
                  </Radio>
                ))}
              </div>
            </RadioGroup>
            {/* Model */}
            <div className='relative flex flex-col gap-3 w-full'>
              <Label>Model</Label>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant='outline'
                    role='combobox'
                    className='w-full justify-between'>
                    {options.model.label}
                    <ChevronsUpDown className='ml-2 h-4 w-4 shrink-0' />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  {MODELS.options.map((model) => (
                    <DropdownMenuItem
                      key={model.label}
                      className={cn(
                        'flex text-sm gap-1 items-center p-1.5 cursor-default hover:bg-zinc-100',
                        {
                          'bg-zinc-200': model.label === options.model.label,
                        }
                      )}
                      onClick={() => {
                        setOptions((prev) => ({ ...prev, model }))
                      }}
                    >
                      <Check
                        className={cn(
                          'mr-2 h-4 w-4',
                          model.label === options.model.label
                            ? 'opacity-100'
                            : 'opacity-0'
                        )}
                      />
                      {model.label}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            {/* Material */}
            {[MATERIALS, FINISHES].map(
              ({ name, options: selectableOptions }) => (
                <RadioGroup
                  key={name}
                  value={options[name]}
                  onChange={(val) => {
                    setOptions((prev) => ({
                      ...prev,
                      [name]: val,
                    }))
                  }}>
                  <Label className="capitalize">
                    {name}
                  </Label>

                  <div className='mt-3 space-y-4'>
                    {selectableOptions.map((option) => (
                      <Radio
                        key={option.value}
                        value={option}
                        className={({ checked }) =>
                          cn(
                            'relative block cursor-pointer rounded-lg bg-white px-6 py-4 shadow-lg border border-zinc-200 focus:outline-none ring-0 focus:ring-0 outline-none sm:flex sm:justify-between',
                            { 'border-blue-500': checked }
                          )
                        }
                      >
                        <span className='flex items-center'>
                          <span className='flex flex-col text-sm'>
                            <Label className='font-medium text-gray-900'>
                              {option.label}
                            </Label>

                            {option.description ? (
                              <Description
                                as='span'
                                className='text-gray-500'>
                                <span className='block sm:inline font-light'>
                                  {option.description}
                                </span>
                              </Description>
                            ) : null}
                          </span>
                        </span>

                        <Description
                          as='span'
                          className='mt-2 flex text-sm sm:ml-4 sm:mt-0 sm:flex-col sm:text-right'>
                          <span className='font-medium text-gray-900'>
                            {getPriceWithLocale(option.price, userLocale, userCurrency)}
                          </span>
                        </Description>
                      </Radio>
                    ))}
                  </div>
                </RadioGroup>
              )
            )}
          </div>
        </div>
      </div>
    </ScrollArea>

    <div className='w-full px-8 h-16 bg-white'>
      <div className='h-px w-full bg-zinc-200 mb-10' />
      
      <div className='w-full h-full flex items-center'>
        <div className='w-full flex flex-col gap-6 items-center'>
          <p className="w-full flex justify-start items-center h-20 mt-10">
            {options.model.label}, {options.color.label}, {options.material.label}, {options.finish.label}
          </p>

          <p className='w-full flex justify-end font-medium whitespace-nowrap'>
            {getPriceWithLocale( 
              BASE_PRICE + options.finish.price + options.material.price,
              userLocale,
              userCurrency,
            )}
          </p>

          <Button
            disabled={isPending}
            onClick={() =>
              saveConfig({
                configId,
                color: options.color.value,
                finish: options.finish.value,
                material: options.material.value,
                model: options.model.value,
              })
            }
            size='sm'
            className='w-full'>
            Continue
            <ArrowRight className='h-4 w-4 ml-1.5 inline' />
          </Button>
        </div>
      </div>
    </div>
  </div>
  )
}

export default PhoneCaseConfig