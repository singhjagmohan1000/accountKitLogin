
import React from "react";
import axios from "axios";
window.AccountKit_OnInteractive = function () {
    window.AccountKit.init(
        {
            appId: "{{appID}}",
            state: "{{state}}",
            version: "{{version}}",
            fbAppEventsEnabled: true,
            redirect: "{{redirecturl}}"
        }
    );
};

export class LoginPage extends React.Component {
    constructor(props){
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
   handleSubmit(event){
       event.preventDefault();
       alert("Hello")
       window.AccountKit.login(
           'PHONE',
           { },
           loginCallback
       );
       function loginCallback(response) {
           if (response.status === "PARTIALLY_AUTHENTICATED") {
               var code = response.code;
               var csrf = response.state;
               
               axios.post(`http://localhost:5000/api/userLogin`, { code: code,csrf:csrf })
                   .then((res) => {
                       alert(res.data)
                   }).catch((err) => {
                       alert(err)
                       console.log(err)
                       
                   });
           }
           else if (response.status === "NOT_AUTHENTICATED") {
             
               alert("NOT_AUTHENTICATED")
           }
           else if (response.status === "BAD_PARAMS") {
               alert("BAD_PARAMS")
           }
       }

   }
    render(){
        return(<div className="container">
           
      <div className="row">
        <div className="col-md-4"></div>
        <div className="col-md-4">
                    <form onSubmit={this.handleSubmit}> <button className="btn btn-success" >Login With SMS</button></form>
                   
        </div>
        
      </div>
        </div>)
    }
}