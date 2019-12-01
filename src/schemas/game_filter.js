const gameFilter = {
  player: {
    elementType: "input",
    elementConfig: {
      type: "text",
      placeholder: "Player name",
    },
    value: null,
    valid: true,
    touched: false,
  },

  zobristHash: {
    elementType: "input",
    elementConfig: {
      type: "text",
      placeholder: "Zobrist hash",
    },
    value: null,
    valid: true,
    touched: false,
  },


  // SAMPLE CONTROLS
  //
  // sampletextarea: {
  //   elementType: "textarea",
  //   elementConfig: {
  //     rows: 5,
  //     cols: 30,
  //     placeholder: "sampletextarea",
  //   },
  //   value: null,
  //   valid: false,
  //   validationRules: {
  //     notEmpty: true,
  //   },
  //   touched: false,
  // },
  // sampleselect: {
  //   elementType: "select",
  //   elementConfig: {
  //     options: [
  //       {value: "fastest", displayValue: "Fastest"},
  //       {value: "cheapest", displayValue: "Cheapest"},
  //     ],
  //     placeholder: "sampleselect",
  //   },
  //   value: null,
  //   valid: true,
  //   validationRules: {},
  //   touched: false,
  // },
};

export default gameFilter;