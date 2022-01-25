# TaxCalculator

Requirements

  1). Docker should be up and running and run the below commands to fetch the data from the test server.
    docker pull ptsdocker16/interview-test-server
    docker run --init -p 5000:5000 -it ptsdocker16/interview-test-server
    


# Build UI and Implementation
This Tax Calculator is built with the help of react JS. Following libraries are used:
  
  1)Axios is used to fetch the API data.
  
  2)Toast is used to display user friendly success or error messages if any error occurs.
  
  ![image](https://user-images.githubusercontent.com/56839995/150907192-e6e77beb-fe14-4486-b979-17e89e5cdb19.png)
  
  Validations were made-
  
  1).To ensure that the user only enters a number and could not enter any characters through key press event.
  
  2).To restrict multiple clicks when the data is loading by disabling the submit button.
  
  3). Display the currency numbers with commas.
  
  Once the user enters the salary, the API fetches the proper data. If the applicable data is fetched without any error, following data is displayed.
   
   1).Effective rate
   
   2).Tax Brackets, Tax Owed as pe the Tax Rates and Tax Owed.
   
  ![image](https://user-images.githubusercontent.com/56839995/150908211-27cad426-85d2-4682-846b-0711615a09fe.png)

If the API data is not fetched properly, a user friendly message is thrown. As in the image below.
![image](https://user-images.githubusercontent.com/56839995/150908344-99282e12-975c-42c4-aa8a-c9e50a3d46df.png)

# Test

A test case was written in App.test.js to test if the test works without crashing. 

# To run this app

Download the code and from the project directory points-taxcalculator 
    1).use npm start to run this app or
    2).use npm run build and serve -s build.

