const Checkbox = ({ label, value, checkboxStates, setCheckboxStates }) => {
  return (
    <>
      {Object.keys(checkboxStates).map((ele, i) => (
        <label key={i}>
          <input
            type="checkbox"
            checked={checkboxStates.ele}
            onChange={() => {
              console.log(ele);
              console.log(checkboxStates[ele]);

              setCheckboxStates({
                ...checkboxStates,
                [ele]: checkboxStates[ele] ? false : true,
              });
            }}
          />
          <span>{ele}</span>
        </label>
      ))}

      {/* <label>
        <input
          type="checkbox"
          checked={value}
          onChange={() => {
            console.log(label);
            console.log(checkboxStates[label]);
            // console.log(event.target.checked);
            setCheckboxStates({
              ...checkboxStates,
              [label]: checkboxStates[label] ? false : true,
            });
          }}
        />
        <span>{label}</span>
      </label> */}
    </>
  );
};

export default Checkbox;
