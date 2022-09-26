import React from "react";
import styled from "styled-components";
import { Progress } from "antd";

const ProgressBarWrapper = styled.div<{ percent: number }>`
  border: 1px solid black;
  margin-bottom: 20px;
  height: 40px;
  border-radius: 10px;

  div {
    background-color: green;
    height: 30px;
    width: ${(props) => props.percent};
    padding-top: 10px;
    border-radius: 10px;
    text-align: center;
    color: white;
    transition: 0.3s;
  }
`;

type ProgressBarProps = {
  percent: number;
};

function ProgressBar(props: ProgressBarProps) {
  return (
    <Progress
      strokeColor={{
        "0%": "#108ee9",
        "100%": "#87d068",
      }}
      {...props}
    />
    // <ProgressBarWrapper percent={percent}>
    //   <div>{percent}%</div>
    // </ProgressBarWrapper>
  );
}

export default ProgressBar;
