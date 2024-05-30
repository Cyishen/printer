import { notFound } from 'next/navigation'

import { getConfiguration } from "@/db/queries"
import DesignConfigurator from "./DesignConfigurator"

interface PageProps {
  searchParams: {
    [key: string]: string | string[] | undefined
  }
}

const DesignPage = async( { searchParams } : PageProps ) => {
  const { id } = searchParams

  if (!id || typeof id !== 'string') {
    return notFound()
  }

  const configurationData = getConfiguration(id);
  
  const [ 
    configuration
  ] = await Promise.all([ 
    configurationData
  ]);

  if (!configuration) {
    return notFound()
  }

  return (
    <DesignConfigurator 
      configId={configuration?.id} 
      imageUrl={configuration?.imageUrl} 
      imageDimensions={{ width: configuration?.width!, height: configuration?.height }}
    />
  )
}

export default DesignPage