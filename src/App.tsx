import { useEffect, useState } from "react";
import papa from 'papaparse'
import "./App.css";
import type { DataRow, PieDataRow } from "./types";
import { PieChart, Pie, Cell, LabelList, ResponsiveContainer, BarChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Bar, Rectangle } from "recharts";


const App = () => {
  const [csvData,setCsvData] = useState<DataRow[]>([]);
  const [pieData,setPieData] = useState<PieDataRow[]>([]);
  const csvFileUrl = '/data/Data.csv'; // FIX ME

  const getData = async () => {
    let response = await fetch(csvFileUrl);
    let text = await response.text();
    let parsed = await papa.parse<DataRow>(text,{header:true});
    console.log('Successfully parsed data:',parsed); // Log to make it easy to inspect shape of our data in the inspector
    setCsvData(parsed.data) // Only keep rows that have a name, so we avoid blank row at end of file
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
      for (let key in newPieCounts) {
        newPieData.push(
          {name : key, value : newPieCounts[key]}
        )
      }
      setPieData(newPieData);
      console.log('Set new pie data!',newPieData)
    }
  ,[csvData])


  return (
    <main style={{maxWidth:800,margin:'auto'}}>
      <h1>Hello Data Visualization</h1>
      <p>Loaded {csvData.length} rows of CSV Data!</p>
      <h2>Crash Data</h2>
      <PieChart width={300} height={300}>
        <Pie data={pieData} dataKey="value" nameKey="name" label fill="yellow">
          <LabelList dataKey="name" position="middle"/>
          {
          pieData.map(
            (entry)=>(<Cell key={entry.name} fill={entry.name.toLowerCase()} />)
          )}
        </Pie>

      </PieChart>
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
          <Tooltip />
          <Legend />
          <Bar dataKey="value" fill="#8884d8" activeBar={<Rectangle fill="pink" stroke="blue" />} />
          
        </BarChart>
      {/*</ResponsiveContainer>*/} {
        pieData.map(
          (row,idx)=><div key={idx}>{row.name} : {row.value}</div>
        )        
      }


      {csvData.map(
        (row,idx)=><div key={idx}>{}'s favorite color is {row["Age of Driver - Youngest Known"]} and they play {row["Age of Driver - Oldest Known"]}</div>
      )}
    </main>
  );
};

export default App;
