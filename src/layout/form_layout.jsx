import Details from '../components/details'
import Profile from '../components/profile'
import Skills from '../components/skills'
import Layers from '../components/layers'
import NavigationFooterButton from '../components/navigation_footer_button'

export default function FormLayout({...formProps}) {
    const {activeTab, setActiveTab, breadCrumbItems} = formProps
    const navigationProps = {activeTab, setActiveTab, breadCrumbItems}
  return (
    <div className="space-y-4 card_style h-fit md:h-180 2xl:h-200 flex flex-col justify-between">
        <div className="h-fit md:h-160 2xl:h-180 overflow-y-auto md:pb-16">
            {/* Details */}
            {activeTab === 'details' && <Details {...formProps}/>}

            {/* Profile */}
            {activeTab === 'profile' && <Profile {...formProps}/>}

            {/* Skills */}
            {activeTab === 'skills' && <Skills {...formProps}/>}

            {/* Layers */}
            {activeTab === 'layers' && <Layers {...formProps}/>}
        </div>
        <NavigationFooterButton {...navigationProps}/>
    </div>
  )
}