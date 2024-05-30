import { notFound } from 'next/navigation'
import { getConfiguration } from "@/db/queries"
import DesignPreview from './DesignPreview'

interface PageProps {
  searchParams: {
    [key: string]: string | string[] | undefined
  }
}

const PreviewPage = async( { searchParams } : PageProps ) => {
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
    <DesignPreview configuration={configuration} />
  )
}

export default PreviewPage