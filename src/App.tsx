import { useEffect, useState } from "react";
import papa from 'papaparse'
import "./App.css";
import type { DataRow, PieDataRow } from "./types";
import { PieChart, Pie, Cell, LabelList, ResponsiveContainer, BarChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Bar, Rectangle,   } from "recharts";

const percentageDriversByAge = {
  '<16':0.1,
'16-17':0.5+0.8,
'18-20':1.1+1.3+1.4,
'21-24':3+1.5+1.6,
'25-34':8.4+9.0,
'35-44':8.7+8.4,
'45-54':7.7+8.2,
'55-64':8.3+8.4,
'65-74':7.4+6.0,
'75-84':+4.2+2.4,
'>84':1.8,


}
// @ts-ignore
const CustomToolTip = ({active, payload, label}) => {
  if (active && payload && payload.length) {
    let dataPoint = payload[0].payload;
    return (
    <div>
     {dataPoint.value} total accidents
     <br/>{dataPoint.percentageOfDrivers.toFixed(2)}% of drivers
     <br/>{Math.floor(dataPoint.scaledValue)} scaled number of accidents
    </div>
    )
  }
}

const App = () => {
  const [csvData,setCsvData] = useState<DataRow[]>([]);
  const [pieData,setPieData] = useState<PieDataRow[]>([]);
  const [dataKey,setDataKey] = useState<string>("scaledValue")
  const csvFileUrl = '/data/Data.csv'; // FIX ME

  const getData = async () => {
    let response = await fetch(csvFileUrl);
    let text = await response.text();
    let parsed = await papa.parse<DataRow>(text,{header:true});
    console.log('Successfully parsed data:',parsed); // Log to make it easy to inspect shape of our data in the inspector
    // remove values with no age
    const data = parsed.data.filter(
      (row)=>row['Age of Driver - Youngest Known']
    ) // remove rows with no Age of Driver - Youngest Known
    setCsvData(data) // Only keep rows that have a name, so we avoid blank row at end of file
  }




  useEffect(
    ()=>{getData()},[]
  );

  useEffect(
    ()=>{
      // Update whenever data changes...
      let newPieCounts : {[key : string] : number} = {};
      let newPieData : PieDataRow[] = [];
      csvData.forEach(
        (row)=>{
          if (!newPieCounts[row["Age of Driver - Youngest Known"]]) {
            newPieCounts[row["Age of Driver - Youngest Known"]] = 0; // initialize if not there...
          }
          newPieCounts[row["Age of Driver - Youngest Known"]]++ // Add one!
        }
      )
      for (let key of [
        '<16',
        '16-17',
        '18-20',
        '21-24',
        '25-34',
        '35-44',
        '45-54',
        '55-64',
        '65-74',
        '75-84',
        '>84',

      ]) {
    
        newPieData.push(
          {name : key, value : newPieCounts[key], 
                // @ts-ignore 
            percentageOfDrivers : percentageDriversByAge[key], 
            // @ts-ignore
            scaledValue : newPieCounts[key]/(.01*percentageDriversByAge[key])
          }
        );
      }

      setPieData(newPieData);
      console.log('Set new pie data!',newPieData)
    }
  ,[csvData])


  return (
    <main style={{maxWidth:800,margin:'auto'}}>
      <h1>Lowell Crash Data: 2020-2024 </h1>
      <h2>Crash Data</h2>
      <button onClick={()=>setDataKey("value")}>Raw Data</button>
      <button onClick={()=>setDataKey("percentageOfDrivers")}>% of Drivers</button>
      <button onClick={()=>setDataKey("scaledValue")}># of Crashes if All Drivers were X Age</button>
      {/*<ResponsiveContainer width="100%" height="100%">*/}
        <BarChart
          width={1200}
          height={300}
          data={pieData}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip content={<CustomToolTip/>} />
          <Legend />

          <Bar dataKey={dataKey} fill="#8884d8" activeBar={<Rectangle fill="pink" stroke="red" />} />
         
          
        </BarChart>
      {/*</ResponsiveContainer>*/} {
        pieData.map(
          (row,idx)=><div key={idx}>{row.name} : {row.value}</div>
        )        
      }


      
    </main>
  );
};

export default App;
