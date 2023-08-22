import React from "react";
import "./StatsContainerItem.css";
const StatsContainerItem = () => {
  return (
    <div className='stats-container-item'>
      <div className='title'>Website Views</div>
      <div className='content'>
          <div className="stats"><p>246K</p><small>24%</small></div>
          <div className="graph">graph</div>
      </div>
    </div>
  );
};

export default StatsContainerItem;
