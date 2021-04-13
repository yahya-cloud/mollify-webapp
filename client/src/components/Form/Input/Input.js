import React from 'react';
import CountryInput from './CountryInput';
import FileBase from 'react-file-base64';
import './Input.css';



const Input = (props) => {

    let input= null;


    switch (props.type) {
        case 'text':
           input = (<div className="inputContainer">
        <label className="label" htmlFor={`${props.name}`}>Enter {props.name}</label>
        <input id={`${props.name}`} className="input" type="text" placeholder={`Enter your ${props.name}`} value={props.value} name={`${props.name}`} onChange={(e) => props.changeHandler(e)}/> 
        </div>)
        break;

        case 'country':
            input = (
                <div className="inputContainer">
                <label className="label" for='country'>Select your Country</label>
                <CountryInput  onChange={ (e) => props.changeHandler(e) }/>
                </div>
            )
            break;

        case 'userType':
            input = (
                <div className="inputContainer">
                <label className="label" for='userType'>Who you are registering as</label>
                <select className="input" id="userType" name='userType' onChange={(e) => props.changeHandler(e)} >
                <option value="patient">patient</option>
                <option value="doctor">doctor</option>
                </select>
                </div> 
            )
            break;    

        case 'email': 
            input = (    <div className="inputContainer">
            <label className="label" for='email'>Enter email</label>
            <input id="email" className="input" type="email" placeholder={`Enter your Email`} value={props.value} name='email' onChange={(e) => props.changeHandler(e)}/> 
            </div>)
            break;
        
        case 'password':
            input = (<div className="inputContainer">
                <label className="label" for='password'>Enter password</label>
                <input id="password" className="input" type="password" placeholder={`Enter password`} value={props.value} name='password' onChange={(e) => props.changeHandler(e)}/> 
                </div>)
                break;

        case 'photo':
            input = (
            <div className="inputContainer photoContainer">
            <div className='photoForm' style={{backgroundImage:`url(${props.value})`}}></div>
            <FileBase
                type="file"
                multiple={false}
                onDone={(base64) => props.changeHandler( false,base64.base64) }
            /> 
            </div>
            )
         
        break;      
    
        default:
            break;
    }

    return input;
}

export default Input;
