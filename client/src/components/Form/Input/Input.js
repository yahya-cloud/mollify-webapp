import React from 'react';
import CountryInput from './CountryInput';
import FileBase from 'react-file-base64';
import './Input.css';

const Input = (props) => {

    let input= null;
    let errorMessage = null;
    const inputClasses = ['inputContainer'];

    if(props.type === 'photo'){
        inputClasses.push('photoContainer');
    }

    if(props.inValid && props.shouldValidate && props.isTouched){
        inputClasses.push('invalid')
        errorMessage = (<p>Please enter valid value</p>)
    }


    switch (props.type) {
        case 'text':
           input = (
        <input id={`${props.name}`} className="input" type="text" placeholder={`Enter your ${props.name}`} value={props.value} name={`${props.name}`} onChange={(e) => props.changeHandler(e)}/> )
        break;

        case 'country':
            input = (
                <CountryInput  onChange={ (e) => props.changeHandler(e) }/>
            )
            break;

        case 'userType':
            input = (
                <select className="input" id="userType" name='userType' onChange={(e) => props.changeHandler(e)} >
                <option value="patient">patient</option>
                <option value="doctor">doctor</option>
                </select>
            )
            break;    

        case 'email': 
            input = ( 
            <input id="email" className="input" type="email" placeholder={`Enter your Email`} value={props.value} name='email' onChange={(e) => props.changeHandler(e)}/> 
            )
            break;
        
        case 'password':
            input = (
                <input id="password" className="input" type="password" placeholder={`Enter password`} value={props.value} name='password' onChange={(e) => props.changeHandler(e)}/> 
                )
                break;

        case 'photo':
            input = (<>
            <div className='photoForm' style={{backgroundImage:`url(${props.value})`}}></div>
            <FileBase
                type="file"
                multiple={false}
                onDone={(base64, e) => props.changeHandler( e, base64.base64) }
            /> 
            </>
            )
         
        break;      
    
        default:
            break;
    }

    return (<div className={inputClasses.join(' ')}>
    {!(props.type === 'photo') && <label className="label" htmlFor={`${props.name}`}>Enter {props.name}</label> }
    {input}
    {errorMessage}
    </div>)
}

export default Input;
