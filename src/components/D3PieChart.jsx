import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

const D3RadarChart = ({ data, width = 400, height = 400 }) => {
  const svgRef = useRef();

  useEffect(() => {
    if (!data || data.length === 0) return;

    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove(); // Clear previous render

    const margin = 50;
    const radius = Math.min(width, height) / 2 - margin;
    const centerX = width / 2;
    const centerY = height / 2;

    // Create main group and center it
    const g = svg
      .append('g')
      .attr('transform', `translate(${centerX}, ${centerY})`);

    // Number of axes (capacities)
    const numAxes = data.length;
    const angleSlice = (Math.PI * 2) / numAxes;

    // Scale for radius (0 to max value)
    const maxValue = d3.max(data, d => d.value);
    const radiusScale = d3.scaleLinear()
      .domain([0, maxValue])
      .range([0, radius]);

    // Create circular grid lines
    const levels = 5;
    for (let level = 1; level <= levels; level++) {
      const levelRadius = (radius / levels) * level;
      
      g.append('circle')
        .attr('cx', 0)
        .attr('cy', 0)
        .attr('r', levelRadius)
        .style('fill', 'none')
        .style('stroke', '#fff')
        .style('stroke-width', '0.5px')
        .style('opacity', '0.3');

      // Add level labels
      g.append('text')
        .attr('x', 4)
        .attr('y', -levelRadius)
        .attr('dy', '0.4em')
        .style('font-size', '10px')
        .style('fill', '#fff')
        .text((maxValue / levels * level).toFixed(0));
    }

    // Create axis lines
    const axes = g.selectAll('.axis')
      .data(data)
      .enter()
      .append('g')
      .attr('class', 'axis');

    axes.append('line')
      .attr('x1', 0)
      .attr('y1', 0)
      .attr('x2', (d, i) => radius * Math.cos(angleSlice * i - Math.PI / 2))
      .attr('y2', (d, i) => radius * Math.sin(angleSlice * i - Math.PI / 2))
      .style('stroke', '#fff')
      .style('stroke-width', '1px')
      .style('opacity', '0.5');

    // Add axis labels
    axes.append('text')
      .attr('class', 'legend')
      .style('font-size', '12px')
      .style('font-weight', 'bold')
      .style('fill', '#fff')
      .attr('text-anchor', 'middle')
      .attr('dy', '0.35em')
      .attr('x', (d, i) => (radius + 15) * Math.cos(angleSlice * i - Math.PI / 2))
      .attr('y', (d, i) => (radius + 15) * Math.sin(angleSlice * i - Math.PI / 2))
      .text(d => d.label);

    // Create radar area
    const line = d3.line()
      .x((d, i) => radiusScale(d.value) * Math.cos(angleSlice * i - Math.PI / 2))
      .y((d, i) => radiusScale(d.value) * Math.sin(angleSlice * i - Math.PI / 2))
      .curve(d3.curveLinearClosed);

    // Add the radar area
    g.append('path')
      .datum(data)
      .attr('d', line)
      .style('fill', '#ff6b6b')
      .style('fill-opacity', 0.3)
      .style('stroke', '#ff6b6b')
      .style('stroke-width', '2px');

    // Add dots on each point
    g.selectAll('.radarCircle')
      .data(data)
      .enter()
      .append('circle')
      .attr('class', 'radarCircle')
      .attr('r', 4)
      .attr('cx', (d, i) => radiusScale(d.value) * Math.cos(angleSlice * i - Math.PI / 2))
      .attr('cy', (d, i) => radiusScale(d.value) * Math.sin(angleSlice * i - Math.PI / 2))
      .style('fill', '#ff6b6b')
      .style('cursor', 'pointer')
      .on('mouseover', function(event, d) {
        d3.select(this)
          .transition()
          .duration(200)
          .attr('r', 6);

        // Show tooltip
        const tooltip = d3.select('body').append('div')
          .attr('class', 'tooltip')
          .style('position', 'absolute')
          .style('background', 'rgba(0, 0, 0, 0.8)')
          .style('color', 'white')
          .style('padding', '8px')
          .style('border-radius', '4px')
          .style('pointer-events', 'none')
          .style('opacity', 0);

        tooltip.transition()
          .duration(200)
          .style('opacity', 1);

        tooltip.html(`${d.data.label}: ${d.data.value}`)
          .style('left', (event.pageX + 10) + 'px')
          .style('top', (event.pageY - 10) + 'px');
      })
      .on('mouseout', function(event, d) {
        d3.select(this)
          .transition()
          .duration(200)
          .attr('r', 4);

        // Remove tooltip
        d3.selectAll('.tooltip').remove();
      });

  }, [data, width, height]);

  return (
    <div className="radar-chart-container">
      <svg
        ref={svgRef}
        width={width}
        height={height}
        style={{ 
          background: 'transparent', // Fond transparent
          borderRadius: '8px' 
        }}
      />
    </div>
  );
};

export default D3RadarChart;