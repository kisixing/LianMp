/**
 * 体重/血压输入svg
 * created by ADMIN
 */
import React from 'react';
import { Chart, Geom, Axis, Coord, Guide, Shape } from 'bizcharts';

const { Arc, Html, Line } = Guide;

const cols = {
  value: {
    min: 0,
    max: 80,
    tickInterval: 10,
    nice: true,
  },
};

Shape.registerShape('point', 'pointer', {
  drawShape(cfg, group) {
    let point = cfg.points[0];
    point = this.parsePoint(point);
    const center = this.parsePoint({
      x: 0,
      y: 0,
    });
    group.addShape('line', {
      attrs: {
        x1: center.x,
        y1: center.y,
        x2: point.x,
        y2: point.y,
        // stroke: cfg.color,
        lineWidth: 2,
        lineCap: 'round',
      },
    });
    return group.addShape('circle', {
      attrs: {
        x: center.x,
        y: center.y,
        // r: 6,
        stroke: cfg.color,
        lineWidth: 3,
        fill: '#fff',
      },
    });
  },
});

class Gauge extends React.Component {
  render() {
    const {
      title,
      value,
      scale = cols,
      color = '#1890FF',
    } = this.props;

    let data = [{ value: null },];
    if (value) {
      data = [{ value: parseInt(value) },];
    }

    return (
      <Chart
        height={200}
        width={375}
        data={data}
        scale={scale}
        padding={[0, 0, 4, 0]}
        forceFit
      >
        <Coord type="polar" startAngle={-1 * Math.PI} endAngle={0 * Math.PI} radius={0.8} />
        <Axis
          name="value"
          zIndex={2}
          line={null}
          label={{
            offset: -12,
            textStyle: {
              fontSize: 14,
              textAlign: 'center',
              textBaseline: 'middle',
            },
          }}
          subTickCount={4}
          subTickLine={{
            length: -8,
            stroke: '#eee',
            strokeOpacity: 1,
          }}
          tickLine={{
            length: -14,
            stroke: '#eee',
            strokeOpacity: 1,
          }}
        />
        <Axis name="1" visible={false} />
        <Guide>
          <Arc
            zIndex={0}
            start={[0, 0.965]}
            end={[scale.value.max, 0.965]}
            style={{ // 底灰色
              stroke: '#eee',
              lineWidth: 4,
            }}
          />
          <Arc
            zIndex={1}
            start={[0, 0.965]}
            end={[data[0].value, 0.965]}
            style={{
              stroke: color,
              lineWidth: 4,
            }}
          />
        </Guide>
        <Geom
          type="point"
          position="value*1"
          shape="pointer"
          color="#1890FF"
          active={false}
          style={{ stroke: '#fff', lineWidth: 1 }}
        />
      </Chart>
    );
  }
}

export default Gauge;
