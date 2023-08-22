import React, { useEffect } from "react";
import Layout from "../../components/Layout/Layout";
import StatsContainerItem from "../../components/StatsContainerItem/StatsContainerItem";
import LineChart from "../../components/ChartJs/LineChart";
import "./Dashboard.css";
import PieChart from "../../components/ChartJs/PieChart";
import { Grid, Paper } from "@material-ui/core";
const Dashoard = () => {
  useEffect(() => {
    window.scroll(0, 0);
  }, []);
  return (
    <div>
      <Layout title='Dashboard' header='Overview'>
        <div className='stats-container'>
          {[...new Array(4)].map(() => (
            <div>
              <StatsContainerItem />
            </div>
          ))}
        </div>
        <Grid container spacing={2}>
          <Grid item xs>
            <Paper>
              <LineChart />
            </Paper>
          </Grid>
          <Grid item xs>
            <Paper>
              <PieChart />
            </Paper>
          </Grid>
        </Grid>
      </Layout>
    </div>
  );
};

export default Dashoard;
