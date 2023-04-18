import SinglePokemon from "./SinglePokemon";
import { FixedSizeGrid as Grid } from "react-window";
import AutoSizer from "react-virtualized-auto-sizer";
import "./style.css";
import "react-virtualized/styles.css";
import { useEffect, useState } from "react";

const Cell = ({ columnIndex, rowIndex, style, results, columns }) => {
  const index = rowIndex * columns + columnIndex;
  if (index >= results.length) {
    return null;
  }
  const { id, name } = results[index];
  return (
    <div style={{ ...style, padding: "10px" }}>
      <SinglePokemon key={id} name={name} />
    </div>
  );
};

function App({ results, gridRef }) {
  const [columns, setColumns] = useState(4);

  const isValidWidth = (width) => {
    return typeof width === "number" && width > 0;
  };

  useEffect(() => {
    const updateColumns = () => {
      const width = window.innerWidth;

      if (!isValidWidth(width)) {
        console.error("Invalid width value:", width);
        return;
      }

      if (width <= 500) {
        setColumns(1);
      } else if (width <= 1000) {
        setColumns(2);
      } else {
        setColumns(4);
      }
    };

    updateColumns();
    window.addEventListener("resize", updateColumns);

    return () => {
      window.removeEventListener("resize", updateColumns);
    };
  }, []);

  const Cell = ({ columnIndex, rowIndex, style }) => {
    const index = rowIndex * columns + columnIndex;
    if (index >= results.length) {
      return null;
    }
    const { id, name } = results[index];
    return (
      <div style={{ ...style, padding: "10px" }}>
        <SinglePokemon key={id} name={name} />
      </div>
    );
  };

  return (
    <div style={{ height: "100vh" }}>
      <AutoSizer>
        {({ height, width }) => {
          if (!isValidWidth(width)) {
            return <div>Error: Invalid width value</div>;
          }
          return (
            <Grid
              ref={gridRef}
              className={`react-window-list`}
              columnCount={columns}
              columnWidth={width / columns}
              height={height}
              rowCount={Math.ceil(results.length / columns)}
              rowHeight={350}
              width={width}
            >
              {Cell}
            </Grid>
          );
        }}
      </AutoSizer>
    </div>
  );
}

export default App;
