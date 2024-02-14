# Data Visualization Project

For this project, we will be learning about how to use computers to help understand and interpret data. A huge amount of the power of computers comes from working with data, which comes in a variety of forms. Much effective computer science involves manipulating data in order to answer questions.

In this project, we will be using our programming skills to help explore data sets.

[Model project source code here](https://github.com/thinkle-iacs/data-visualization/)

## Libraries used in this project

### Mapping Data
To map data we will be using open layers library through the [rlayers](https://mmomtchev.github.io/rlayers/) react package. Here is some example map code at 
work: [Model Map Component](https://github.com/thinkle-iacs/data-visualization/blob/main/src/components/Map.tsx)

### Charting Data
To chart data, we will be using the [recharts library](https://recharts.org/). Click on "API" for a guide to the different chart types.
As a rule, we will need to first get our data into a simple form where we have a list of objects like this...

```typescript
let dataToGraph = [
  {name : 'Rear-Ends',
   value : 28},
  {name : 'Sideswipe',
  value : 42},
  {name : 'Head-On',
  value : 12}
]
```

Once we have that data, we can add it to a chart by using the recharts library. Take a look at their many examples
on their website, or here's a quick starter:

```typescript
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  LabelList,
} from "recharts";
```

```jsx
    <BarChart width={1200} height={400} data={dataToGraph}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Bar dataKey="count" fill="#8884d8">
        <LabelList dataKey="count" position="top" />
      </Bar>
    </BarChart>
```




