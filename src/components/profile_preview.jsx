import { getName, getProfileDetails } from "../utils/utils"

export default function ProfilePreview({...formProps}) {
    const {data, formData} = formProps
  return (
    <div className='border p-8'>
        <div>
            <div className='flex gap-4'>
                <p>Agent Name</p>
                <p>{formData?.name || 'No Name'}</p>
            </div>
            <div className='flex gap-4'>
                <p>Selected Profile</p>
                <p>{getProfileDetails(formData?.profile, data)?.name || 'No Profile Selected'}</p>
                <p>{getProfileDetails(formData?.profile, data)?.description || ''}</p>
            </div>

            <div >
                <p>Selected Skills</p>
                {formData?.skills?.length > 0 && formData?.skills?.map((skill, index) => (
                    <div className="flex items-center gap-2" key={index}>
                        <p>{getName(skill, data)}</p>
                    </div>
                ))}
            </div>
            <div>
                <p>Selected Layers</p>
                {formData?.layers?.length > 0 && formData?.layers?.map((layer, index) => (
                    <p key={index}>{getName(layer, data)}</p>
                ))}
            </div>

            <div className='flex gap-4'>
                <p>AI Provider</p>
                <p>{formData?.provider || 'No Provider'}</p>
            </div>
        </div>
    </div>
  )
}
