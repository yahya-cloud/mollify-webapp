import React, {useEffect, useState} from 'react';

import './Form.css';
import Button from '../UI/Button/Button';
import Input from './Input/Input';


const Form = (props) => {

    const  [inputData, setInputData] = useState({});
    
    useEffect(() => {
        if(!props.signup){
            setInputData({email:{type:'email', name:'email', value:''},  password:{type:'password', name:'password', value:''}})
        }else{
            setInputData({
                photo: {type:'photo', name:'photo', value:''},
                name:{type:'text', name:'name', value:''},
                country:{type:'country', name:'country', value:''},
                state:{type:'text', name:'state', value:''},
                address:{type:'text', name:'address', value:''},
                userType:{type:'userType', name:'userType', value:'patient'},
                email:{type:'email', name:'email', value:''},
                password:{type:'password', name:'password', value:''},
                phoneNumber:{type:'text', name:'phoneNumber', value:''},
             })
        }
    }, [props.signup])


    const formInputs = [];
    for(let key in inputData){
        formInputs.push({...inputData[key]});
    }

    //input for usertype 
    const changeHandler = (e, photoData) => {
       let updatedForm = {...inputData};
       if(photoData){updatedForm['photo'].value = photoData;}
       else{
        updatedForm[e.target.name].value = e.target.value;
        if(e.target.name === 'userType'){ if(e.target.value === 'doctor'){updatedForm = {...updatedForm, pricing:{type:'text', name:'pricing', value:''}}}else{updatedForm = {...updatedForm}}}
       }
       setInputData({...updatedForm})
    }

    const submitHandler = (e) => {
        e.preventDefault();
        let formData = {};
        for(let key in inputData){
            if(key !== 'country' && key !== 'state'){
            formData[key] = inputData[key].value
            }
        }
        if(props.signup){formData['address'] = `${inputData['address'].value}  ${inputData['state'].value}  ${inputData['country'].value}`;}
        props.handleSubmit(formData)
    }



    return (
    <form className="mainForm" onSubmit={(e) => submitHandler(e)}>


     {formInputs.map(el => {
         return (<Input
         type={el.type}
         name={el.name}
         changeHandler={changeHandler}
         value={el.value}
         />)
     })}



    <Button btnType="btnCard" btnColor="btnGreen">Edit Details</Button>
    </form>
    )
}

export default Form
