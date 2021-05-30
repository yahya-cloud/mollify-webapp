import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import classes from './Doughnut.module.css';

const DoughnutCard = (props) => {
    console.log(...props.labels);

    const data = {
        labels:[...props.labels],
        
        datasets:[{
            data:[...props.data],
            backgroundColor:[...props.colors],
        } ]
    }

    return (
        <div className={classes.doughnutCard}>
            <Doughnut 
                data= {data}
            options={{
             
                
                layout:{
                    padding:{
                        top: 10
                    }
                },
                legend:{
                    display: true,
                    align: "center",
                    position:"bottom",
                    labels:{
                        boxWidth:40,
                        fontSize:15,
                        fontColor: "#000",
                        padding: 20
                    }
                },

                
                
                // responsive: true,
                maintainAspectRatio:false          
                
            }}
            />
        </div>
    )
}

export default DoughnutCard;
