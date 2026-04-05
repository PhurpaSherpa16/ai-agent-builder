import { getIcons, getProfileDetails } from '../utils/utils'
import { useState } from 'react'
import Button from './button_for_normal'
import ItemInformation from './item_information'
import { ProfileSkeleton } from './skeleton'

export default function Profile({ ...formProps }) {
  const { data, formData, handleChange, formError, loading } = formProps
  const [isSelect, setIsSelect] = useState(false)
  const profiles = data?.agentProfiles.map((profile) => {
    return {
      id: profile.id,
      name: profile.name,
      description: profile.description,
      icon: getIcons(profile.name, 'text-black/60 size-4')
    }
  }) || []

  return (
    <div className="space-y-8">
      <div>
        <div className='block mb-4'>
          <label htmlFor="profile-select ">Base Profile</label>
          <p className='text-sm text-gray-500'>Select the base profile - category for your agent</p>
        </div>
        <div id="profile-select" className="flex gap-4 flex-wrap h-70 md:h-full overflow-y-scroll">
          {loading ? (
            <ProfileSkeleton />
          ) : (
            profiles?.map((profile, index) => {
              const isAdded = formData.profile === profile.id
              const buttonProps = { data: profile, isAdded, handleChange, setIsSelect }
              return (
                <Button key={index} {...buttonProps} />
              )
            })
          )}
        </div>
        {formError?.profile && formData.profile === '' && (
          <p className='error pt-4'>{formError.profile}</p>
        )}
      </div>

      {(formData.profile && !isSelect) &&
        <>
          <hr className="border-gray-200" />
          <ItemInformation item={getProfileDetails(formData.profile, data)} />
        </>
      }
    </div>
  )
}


