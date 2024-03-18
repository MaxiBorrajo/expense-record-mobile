import React, { useRef, useEffect, useState } from "react";
import { View, Text } from "react-native";

const TooltipComponent = ({ dataPoint, colors, monthData }) => {
  const tooltipRef = useRef(null);
  const [tooltipWidth, setTooltipWidth] = useState(0);

  useEffect(() => {
    if (tooltipRef.current) {
      tooltipRef.current.measure((x, y, width, height, pageX, pageY) => {
        setTooltipWidth(width);
      });
    }
  }, []);

  return (
    <View
      style={{
        position: "absolute",
        top: dataPoint.y - 40,
        left: dataPoint.x - ((+tooltipWidth - 32) / 2),
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <View
        ref={tooltipRef}
        style={{
          backgroundColor: "rgba(215, 173, 87, 0.9)",
          borderRadius: 8,
          padding: 5,
          justifyContent: "center",
          alignItems: "center",
          elevation: 3,
        }}
      >
        <Text
          style={{
            color: colors.text,
            fontSize: 12,
            fontFamily: "Poppins_300Light",
          }}
        >
          {monthData(dataPoint.index)
            ? monthData(dataPoint.index)?.total > 0
              ? `$${(monthData(dataPoint.index)?.total / 1000)?.toFixed(2)}K`
              : `-$${((monthData(dataPoint.index)?.total / 1000) * -1)?.toFixed(
                  2
                )}K`
            : `$0.00K`}
        </Text>
      </View>
      <View
        style={{
          width: 0,
          height: 0,
          backgroundColor: "transparent",
          borderStyle: "solid",
          borderLeftWidth: 5,
          borderRightWidth: 5,
          borderBottomWidth: 5,
          borderTopWidth: 0,
          borderLeftColor: "transparent",
          borderRightColor: "transparent",
          borderBottomColor: "rgba(215, 173, 87, 0.9)",
          borderTopColor: "transparent",
          transform: [{ rotate: "180deg" }],
        }}
      />
    </View>
  );
};

export default TooltipComponent;
