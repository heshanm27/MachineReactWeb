import { Paper } from '@material-ui/core'
import React from 'react'
import '../css/style.css'
export default function Pdftemplate({props}) {
   
  
    return (
      
        <div className="main-tamplate">
        
        <div className="B-name">
          <div className="main-title">
            GALLAGE MOTORS (PVT) LTD.DAMBULLA <span className="hilight-text">0112405235</span> <br/>
          </div>
          <div className="sub-title">
            <span className="hilight-text">WARRANTY CERTIFICATE</span> for repaired Common Rail Injector
          </div>
        </div>
        <form>
          <table className="main-table">
            <tbody>
              <tr>
                <td className="table-data">Name :<input type="text" value={props.Brand} /></td>
                <td className="table-data left">Date of Repair :<input type="text"/><br/></td>
              </tr>
              <tr>
                <td className="table-data">Contact No. : <input type="text" /></td>
                <td className="table-data left">Warranty Till : <input type="text"/><br/></td>
              </tr>
              <tr>
                <td className="table-data">Address : <input type="text"/></td>
                <td className="table-data left">Bill No : <input type="text"/><br/></td>
              </tr>
              <tr>
                <td className="table-data">Vehicle : <input type="text"/></td>
                <td className="table-data left">Technician : <input type="text"/><br/></td>
              </tr>
              <tr>
                <td className="table-data">Registration No. : <input type="text"/></td>
                <td className="table-data left">Contact No. : <input type="text"/><br/></td>
              </tr>
              <tr>
                <td className="table-data"> Address : <input type="text"/><br/></td>
              </tr>
            </tbody>
          </table>
        </form>
    
        <br/>
        <div className="midle-area">
          <form>
            Engine Code : <input type="text"/><br/>
            Injector Make : <input type="text"/><br/>
            Injector No : <input type="text"/> <br/>
            Injector Code : <input type="text"/><br/>
          </form>
        </div>
    
        <p>New Parts Used:</p>
        <form>
        <div className="textbox1">
          <div></div></div>
          <div className="textbox2">  <img className='img' src="https://firebasestorage.googleapis.com/v0/b/socialtest-cef88.appspot.com/o/Productimages%2FScreenshot%20(1296).jpg?alt=media&token=baf0a27a-8887-4f4d-9dff-6dd81ea5bce3" width='200px' height='100px' alt=""/>
          </div>
        </form>
    <br/>
        <div className="midle">
          <p>The Injector stated above is repaired with new parts mentioned in the box no.2 and calibrated to meet Manufactur`s
            specifications. After the repair work, we habe elecrronically tested it to confirm that is in perfect condition.</p>
          <p> We will cover this injector withs <span className="bold-text">3 MONTHS WARRANTY</span> for all <span className="bold-text">our new parts</span> and our rapair work. </p>
          <p> <span className="bold-text">Warranty void if,</span></p>
          <table>
            <tr>
              <td>* Dismantle the injector</td>
              <td>* Electrical fault</td>
              <td>* Used of bad Disel</td>
            </tr>
            <tr>
              <td>* Wrong installation</td>
            </tr>
          </table>
        </div>
    
    
        <div className="bottomArea">
          <p>ඉහත සඳහන් අංක 2 කොටුවෙහි සඳහන් නව කොටස් යොදා අළුත්වැඩියා කර නිෂ්පාදනයේ පිරිවිතරයන් <br/>
            සපුරාලීමට ක්‍රමාංකනය කර ඇත. අළුත්වැඩියා කිරීමෙන් පසුව, එය උසස් තත්ත්වයේ පවතින බව තහවුරු කිරීම සඳහා එය <br/>
            ඉලෙක්ට්‍රොනිකව පරීක්ෂා කර ඇත්තෙමු. </p>
          <p>අපගේ සියලු nනව කොටස් අළුත්වැඩියා කටයුතු/සේවාව සඳහා මාස 3ක වගකීමක් මේ සමහ ලබා දෙන්නෙමු.</p>
          <p><span className="bold-text">වගකීම අහෝසි වන අවස්තා:-</span> ඉන්ජෙක්ටර් ගැලවීම, ඉලෙක්ට්‍රිකල් දෝෂ, අපිරිසිදු ඩීසල් භාවිතය, වැරදි ලෙස සවි කිරීම.</p>
        </div>
        <br/>
        <p>Signature of Technician:- </p>
      </div>
    
    )
}
