import React,{Component} from 'react'
import './Interest.css';
import Table from './Table';
import { toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import axios from 'axios';
// To display the error messages if connection is not established in the API

toast.configure();

class Interest extends Component {

    //****To set the default****

    state = {taxBrackets:[],salary:0,rateVal:0,
            total:0,taxOwed:[],isButtonDisabled: false,
            effectiveRate:0,
            salaryInput:0
    } 
    
    
    //****To handle the changes the input text Salary****

    handleChange = val => {
        
          this.setState({salary:val.currentTarget.value});
       
         
    }
    //****To Handle tax calculations and validations****

    handleTaxCalculation=async () =>{
  

    this.setState({
        isButtonDisabled: true
    });

    // **** Here's the timeout for disabling the button and enabling again to avoid multiple clicks****
    
    setTimeout(() => {
        this.setState({ isButtonDisabled: false }); 
                    }, 5000);

        
            const salaryInput=parseFloat(this.state.salary);
            //****To Handle validation for null values in salary input****
            
            if(isNaN(salaryInput))
            {
                toast.error("Enter some amount");
            }
            else
            {
                //****To Handle validation for API Database Error****

            try
                {
                
                    //****Using Axios to extract data ****

                    const {data} = await axios.get("http://localhost:5000/tax-calculator/brackets/2020");
                    this.setState({taxBrackets:data["tax_brackets"]});
                    const taxRates=data["tax_brackets"];
                    let taxOwed= new Array(taxRates.length).fill(0);;
                    let total=0;
                    let rate=0;
                    let effectiveRate=0;
                    
                    toast.success("Successfuly updated");
                    taxRates.map(function(item, i){
                        
                        rate=0;
                        //****Checking the Salary in which slab it lies and computing the taxOwed****
                          
                        if((parseFloat(salaryInput)>parseFloat(item.min)) && (parseFloat(salaryInput)<=parseFloat(item.max)))
                            {
                                     let val=parseFloat(salaryInput)-parseFloat(item.min);
                                     taxOwed[i]=(parseFloat(item.rate)*val).toFixed(2);
                                     total+=parseFloat(taxOwed[i]);
                            }
                           
                         else if(parseFloat(salaryInput)>parseFloat(item.max))
                            {
                                let val=parseFloat(item.max)-parseFloat(item.min);
                                taxOwed[i]=(parseFloat(item.rate)*val).toFixed(2);
                                total+=parseFloat(taxOwed[i]);
                            }
                        else if(!(parseFloat(item.max)) && parseFloat(salaryInput)>parseFloat(item.min))
                            {
                                
                                let val=parseFloat(salaryInput)-parseFloat(item.min);
                                taxOwed[i]=(parseFloat(item.rate)*val).toFixed(2);
                                total+=parseFloat(taxOwed[i]);
                            }
                                                        
                        

                });
                effectiveRate=(total/salaryInput*100).toFixed(1);
                this.setState({salaryInput});
                this.setState({rateVal:rate});
                this.setState({taxOwed:taxOwed});
                this.setState({effectiveRate:effectiveRate})
                this.setState({total:(total.toFixed(2)).toLocaleString()});
                                    
            }
            catch (error) {
                /****If error comes while fetching the data make the values as null 
                and throw error through toast ****/

                this.setState({rateVal:" "});
                this.setState({taxOwed:" "});
                this.setState({total:" "});
                this.setState({taxBrackets:[]});
                this.setState({effectiveRate:" "});
           
                toast.error("Database Error! Try again after sometime");
             }
             
            } 

    }
    
    render() { 
        /**** Rendering the Data  ****/

        return (
            <div className='main'>
                <ul>
                <p>Calculate your tax bill and identify the tax rate applicable. Enter the yearly salary and click on the submit button to see the tax slabs</p>
                </ul>
                <ul>
                    <p><b>Enter Yearly Salary</b></p> 
                    <label>$</label>             
                    <input onKeyPress={(event) => {
                    /****Validation for only integer values in input field ****/
                      
                    if (!/[0-9]/.test(event.key)) 
                      {
                        event.preventDefault();
                      }
                  
                      }} name="salary"  id="salary" placeholder="Enter the Salary here" value={this.state.salary} onChange={this.handleChange}   onFocus={this.handleFocus}/>
                
                     <input disabled={this.state.isButtonDisabled} type="submit" onClick={this.handleTaxCalculation} />
                </ul>  
                {/****Passing values in prop to create table when the API successfully fetches the data****/}
                
                <Table taxRates={this.state.taxBrackets} salary={this.state.salaryInput} taxOwed={this.state.taxOwed}> total={this.state.total} effectiveRate={this.state.effectiveRate}</Table>
                  
            </div>
        )
        
    }
};
 

export default Interest
