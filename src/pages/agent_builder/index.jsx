import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useFetch } from "../../hooks/useFetch";
import useForm from "../../hooks/useForm";
import BreadCrumb from "../../components/bread_crumb";
import FormLayout from "../../layout/form_layout";
import PreviewLayout from "../../layout/preview_layout";
import { MoveLeft } from "lucide-react";

export default function AgentBuilder() {
  const location = useLocation();
  const navigate = useNavigate();
  const isEditing = location.state?.isEditing;
  const initialData = location.state?.agent;
  const editIndex = location.state?.index;

  const {data, loading, error, fetchData} = useFetch()
  const {formData, handleChange, setFormData, error:formError, setError:setFormError, isSaved, setIsSaved, handleSave} = useForm(initialData || {})
  const breadCrumbItems = ['details', 'profile', 'skills', 'layers']
  
  const [activeTab, setActiveTab] = useState('details')
  const formProps = {data, loading, error, fetchData, formData, handleChange, setFormData, 
    activeTab, setActiveTab, breadCrumbItems, formError, setFormError}

  return (
    <div className="min-h-screen">
        <div className="container mx-auto bg-white p-8 lg:px-0 space-y-4">
            <div>
              <Link to="/" className="flex items-center gap-2 pb-4 group w-fit text-black/60">
                <MoveLeft className="group-hover:-translate-x-1 group-hover:text-indigo-700 transition-all"/> 
                <span className="group-hover:translate-x-1 group-hover:text-indigo-700 transition-all">Back to Home</span>
              </Link>
              <h1>{isEditing ? "Edit AI Agent" : "AI Agent Builder"}</h1>
              <p>{isEditing ? `Modifying settings for "${initialData?.name}"` : "Design your custom AI personality and capability set."}</p>
            </div>
            {/* breadcrumb */}
            <BreadCrumb breadCrumbItems={breadCrumbItems} setActiveTab={setActiveTab} activeTab={activeTab}/>

            <div className="grid grid-cols-2 gap-16">
              <div className="col-span-2 lg:col-span-1">
                <FormLayout {...formProps}/>
              </div>

              {/* preview */}
              <div className="col-span-2 lg:col-span-1">
                <PreviewLayout  {...formProps} onSaveSuccess={() => {
                    setTimeout(() => navigate("/"), 2500);
                  }} isSaved={isSaved} setIsSaved={setIsSaved} isEditing={isEditing}
                  handleSave={() => handleSave(null, setActiveTab, editIndex !== undefined ? editIndex : null)}/>
              </div>
            </div>
        </div>
    </div>
  )
}