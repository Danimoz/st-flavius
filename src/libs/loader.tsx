import { ColorRing } from 'react-loader-spinner';

export default function Loader() {
  return (
    <div className='flex justify-center items-center'>
      <ColorRing 
        width={90}
        height={90}
        ariaLabel='blocks-loading'
        wrapperStyle={{}}
        wrapperClass='blocks-wrapper'
        colors={['#ff4bfd', '#2998ff', '#ff4bfd', '#2998ff', '#849b87']}
      />
    </div>
  )
}