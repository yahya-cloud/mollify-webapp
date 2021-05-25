import { makeStyles } from '@material-ui/core/styles';


export default makeStyles((theme) => ({
    backdrop: {
      zIndex: 1,
      color: '#fff',
    },
    messageBox:{
      zIndex: 5,
      borderRadius:'10px',
      width:'35%',
      height: '50%',
      backgroundColor: '#fff',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      left: '50%',
      top: '50%',
      padding: '2rem',
      '& > h3': {
        fontSize:'2.7rem',
        color: '#333',
        fontWeight: '400',
        textAlign: 'justify',
        lineHeight: 1.3
      },
      '& > *': {
        marginTop:'2rem',
      }
    },
    button:{
      color:'#fff',
      fontSize: 16
    },
      root: {
        display: 'flex',
        position: 'absolute',
        left: '50%',
        top: '50%',
        transform: 'translate(-50%, -50%)',
        '& > * + *': {
          marginLeft: theme.spacing(2),
          color:"#00B1E4"
        },
      },
  }));
  