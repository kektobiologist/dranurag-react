var defaultPrescriptions = [
  {
    _id: 1023,
    patient: 1011,
    url:
      "http://res.cloudinary.com/dukqf8fvc/image/upload/v1508757251/xoj7rfcs604ip7ikphoa.jpg",
    timestamp: 1508757251877,
    title: "October 23rd, 2017",
    __v: 0
  },
  {
    _id: 1017,
    patient: 1011,
    url:
      "http://res.cloudinary.com/dukqf8fvc/image/upload/v1505303701/iopmkk9sleqmhknypdqp.jpg",
    timestamp: 1505303701597,
    title: "September 13th, 2017",
    __v: 0
  },
  {
    _id: 1016,
    patient: 1011,
    url:
      "http://res.cloudinary.com/dukqf8fvc/image/upload/v1505303664/dfqtoyp31x2uwk871n7q.jpg",
    timestamp: 1505303665399,
    title: "September 13th, 2017",
    __v: 0
  },
  {
    _id: 1015,
    patient: 1011,
    url:
      "http://res.cloudinary.com/dukqf8fvc/image/upload/v1505303081/goupxcakrxxhlfst2hwr.jpg",
    timestamp: 1505303082188,
    title: "September 13th, 2017",
    __v: 0
  },
  {
    _id: 1014,
    patient: 1011,
    url:
      "http://res.cloudinary.com/dukqf8fvc/image/upload/v1505299365/csfuaempd0r8oyp7crgz.jpg",
    timestamp: 1505299365927,
    title: "September 13th, 2017",
    __v: 0
  },
  {
    _id: 1013,
    patient: 1011,
    url:
      "http://res.cloudinary.com/dukqf8fvc/image/upload/v1505294441/l8vxylg61tfvllj9kht7.jpg",
    timestamp: 1505294441763,
    title: "September 13th, 2017",
    __v: 0
  },
  {
    _id: 1012,
    patient: 1011,
    url:
      "http://res.cloudinary.com/dukqf8fvc/image/upload/v1505294204/tt1sm9gdtdbcvtwi0aqe.jpg",
    timestamp: 1505294205520,
    title: "September 13th, 2017",
    __v: 0
  },
  {
    _id: 1011,
    patient: 1011,
    url:
      "http://res.cloudinary.com/dukqf8fvc/image/upload/v1505294132/jknejtkbsxmbz5mpygpn.jpg",
    timestamp: 1505294133404,
    title: "September 13th, 2017",
    __v: 0
  },
  {
    _id: 1010,
    patient: 1011,
    url:
      "http://res.cloudinary.com/dukqf8fvc/image/upload/v1505294081/rgs6nrnj3ya4ns1oozyz.jpg",
    timestamp: 1505294082290,
    title: "September 13th, 2017",
    __v: 0
  },
  {
    _id: 1008,
    patient: 1011,
    url:
      "http://res.cloudinary.com/dukqf8fvc/image/upload/v1505291964/heuwfu7p1g9x0y5ip1sc.jpg",
    timestamp: 1505291965104,
    title: "September 13th, 2017",
    __v: 0
  },
  {
    _id: 1007,
    patient: 1011,
    url:
      "http://res.cloudinary.com/dukqf8fvc/image/upload/v1505291935/jzwam1okxgsb38kxfvag.jpg",
    timestamp: 1505291935504,
    title: "September 13th, 2017",
    __v: 0
  },
  {
    _id: 1006,
    patient: 1011,
    url:
      "http://res.cloudinary.com/dukqf8fvc/image/upload/v1505289742/ipthhq3qrlwngcznjfjo.jpg",
    timestamp: 1505289742663,
    title: "September 13th, 2017",
    __v: 0
  },
  {
    _id: 1005,
    patient: 1011,
    url:
      "http://res.cloudinary.com/dukqf8fvc/image/upload/v1505288216/nata1kwytgrgd6fsqgt2.jpg",
    timestamp: 1505288216537,
    title: "September 13th, 2017",
    __v: 0
  },
  {
    _id: 1004,
    patient: 1011,
    url:
      "http://res.cloudinary.com/dukqf8fvc/image/upload/v1505286734/hh9zzsdvfpa5fhhn3rzz.jpg",
    timestamp: 1505286734462,
    title: "September 13th, 2017",
    __v: 0
  },
  {
    _id: 1003,
    patient: 1011,
    url:
      "http://res.cloudinary.com/dukqf8fvc/image/upload/v1505286565/ucsbzv2fuonro8ukvzcm.jpg",
    timestamp: 1505286565471,
    title: "September 13th, 2017",
    __v: 0
  }
];

var defaultPatient = {
  _id: 1017,
  name: "Arpit Tarang Saxena",
  sex: "Male",
  phone1: "7407650530",
  phone2: "",
  height: 169,
  weight: 68,
  allergies: "",
  bmi: 23.81,
  timestamp: 1508739645697,
  inferredBirthdate: "1993-10-23T06:20:45.697Z",
  __v: 0
};

var defaultVisits = [
  {
    _id: 1000,
    patient: {
      _id: 1000,
      name: "Arpit Saxena",
      sex: "Male",
      phone1: "7407650530",
      phone2: "97175852",
      height: 180,
      weight: 68.8,
      bmi: null,
      allergies: "diahhera",
      __v: 0,
      inferredBirthdate: "1989-10-22T15:41:07.712Z"
    },
    date: "2017-09-10T14:35:56.721Z",
    __v: 0,
    ago: "a month ago",
    helpText: "M / 28 yrs /  <i class='fa fa-phone px-1'></i> 7407650530"
  },
  {
    _id: 1001,
    patient: {
      _id: 1001,
      name: "Apoorv Umang Saxena",
      sex: "Female",
      phone1: "9717585206",
      phone2: "",
      height: 171,
      weight: 68,
      bmi: null,
      allergies: "",
      __v: 0,
      inferredBirthdate: "1997-10-22T15:51:09.501Z"
    },
    date: "2017-09-10T16:12:37.185Z",
    __v: 0,
    ago: "a month ago",
    helpText: "F / 20 yrs /  <i class='fa fa-phone px-1'></i> 9717585206"
  },
  {
    _id: 1002,
    patient: {
      _id: 1000,
      name: "Arpit Saxena",
      sex: "Male",
      phone1: "7407650530",
      phone2: "97175852",
      height: 180,
      weight: 68.8,
      bmi: null,
      allergies: "diahhera",
      __v: 0,
      inferredBirthdate: "1989-10-22T15:41:07.712Z"
    },
    date: "2017-09-11T06:21:03.023Z",
    __v: 0,
    ago: "a month ago",
    helpText: "M / 28 yrs /  <i class='fa fa-phone px-1'></i> 7407650530"
  },
  {
    _id: 1012,
    patient: {
      _id: 1011,
      name: "Chambu Chamcham",
      sex: "Male",
      phone1: "",
      phone2: "",
      height: null,
      weight: 67,
      allergies: "",
      bmi: null,
      timestamp: 1505194103643,
      __v: 0,
      inferredBirthdate: "1950-10-22T15:41:07.714Z"
    },
    date: "2017-09-12T05:28:23.688Z",
    __v: 0,
    ago: "a month ago",
    helpText: "M / 67 yrs"
  },
  {
    _id: 1014,
    patient: {
      _id: 1011,
      name: "Chambu Chamcham",
      sex: "Male",
      phone1: "",
      phone2: "",
      height: null,
      weight: 67,
      allergies: "",
      bmi: null,
      timestamp: 1505194103643,
      __v: 0,
      inferredBirthdate: "1950-10-22T15:41:07.714Z"
    },
    date: "2017-09-13T05:14:39.273Z",
    __v: 0,
    ago: "a month ago",
    helpText: "M / 67 yrs"
  },
  {
    _id: 1017,
    patient: {
      _id: 1011,
      name: "Chambu Chamcham",
      sex: "Male",
      phone1: "",
      phone2: "",
      height: null,
      weight: 67,
      allergies: "",
      bmi: null,
      timestamp: 1505194103643,
      __v: 0,
      inferredBirthdate: "1950-10-22T15:41:07.714Z"
    },
    date: "2017-10-22T11:11:15.614Z",
    __v: 0,
    ago: "2 days ago",
    helpText: "M / 67 yrs"
  }
];
export var calendarHeatmapData = [
  {
    date: "2017-11-23",
    amount: 0,
    invoices: []
  },
  {
    date: "2017-11-24",
    amount: 0,
    invoices: []
  },
  {
    date: "2017-11-25",
    amount: 0,
    invoices: []
  },
  {
    date: "2017-11-26",
    amount: 0,
    invoices: []
  },
  {
    date: "2017-11-27",
    amount: 0,
    invoices: []
  },
  {
    date: "2017-11-28",
    amount: 0,
    invoices: []
  },
  {
    date: "2017-11-29",
    amount: 0,
    invoices: []
  },
  {
    date: "2017-11-30",
    amount: 0,
    invoices: []
  },
  {
    date: "2017-12-01",
    amount: 1500,
    invoices: [
      {
        _id: 1205,
        patient: {
          _id: 1009,
          name: "Jamuna Das",
          age: 0,
          id: "1009"
        },
        date: "2017-11-30T18:30:00.000Z",
        amount: 500,
        __v: 0,
        dateString: "2017-12-01",
        id: "1205"
      },
      {
        _id: 1206,
        patient: {
          _id: 1009,
          name: "Jamuna Das",
          age: 0,
          id: "1009"
        },
        date: "2017-11-30T18:30:00.000Z",
        amount: 500,
        __v: 0,
        dateString: "2017-12-01",
        id: "1206"
      },
      {
        _id: 1207,
        patient: {
          _id: 1003,
          name: "Apoorv Umang",
          age: 0,
          id: "1003"
        },
        date: "2017-11-30T18:30:00.000Z",
        amount: 500,
        __v: 0,
        dateString: "2017-12-01",
        id: "1207"
      }
    ]
  },
  {
    date: "2017-12-02",
    amount: 2000,
    invoices: [
      {
        _id: 1208,
        patient: {
          _id: 1006,
          name: "E",
          age: 0,
          id: "1006"
        },
        date: "2017-12-01T18:30:00.000Z",
        amount: 500,
        __v: 0,
        dateString: "2017-12-02",
        id: "1208"
      },
      {
        _id: 1209,
        patient: {
          _id: 1001,
          name: "Arpit Tarang Saxena",
          age: 0,
          id: "1001"
        },
        date: "2017-12-01T18:30:00.000Z",
        amount: 500,
        __v: 0,
        dateString: "2017-12-02",
        id: "1209"
      },
      {
        _id: 1210,
        patient: {
          _id: 1004,
          name: "Anurag Saxena",
          age: 0,
          id: "1004"
        },
        date: "2017-12-01T18:30:00.000Z",
        amount: 500,
        __v: 0,
        dateString: "2017-12-02",
        id: "1210"
      },
      {
        _id: 1211,
        patient: {
          _id: 1007,
          name: "Deepak Agrawal",
          age: 0,
          id: "1007"
        },
        date: "2017-12-01T18:30:00.000Z",
        amount: 500,
        __v: 0,
        dateString: "2017-12-02",
        id: "1211"
      }
    ]
  },
  {
    date: "2017-12-03",
    amount: 300,
    invoices: [
      {
        _id: 1212,
        patient: {
          _id: 1010,
          name: "Saroj Kumar",
          age: 0,
          id: "1010"
        },
        date: "2017-12-02T18:30:00.000Z",
        amount: 300,
        __v: 0,
        dateString: "2017-12-03",
        id: "1212"
      }
    ]
  },
  {
    date: "2017-12-04",
    amount: 1100,
    invoices: [
      {
        _id: 1213,
        patient: {
          _id: 1003,
          name: "Apoorv Umang",
          age: 0,
          id: "1003"
        },
        date: "2017-12-03T18:30:00.000Z",
        amount: 500,
        __v: 0,
        dateString: "2017-12-04",
        id: "1213"
      },
      {
        _id: 1214,
        patient: {
          _id: 1005,
          name: "Arpit Tarang Saxena",
          age: 0,
          id: "1005"
        },
        date: "2017-12-03T18:30:00.000Z",
        amount: 300,
        __v: 0,
        dateString: "2017-12-04",
        id: "1214"
      },
      {
        _id: 1215,
        patient: {
          _id: 1006,
          name: "E",
          age: 0,
          id: "1006"
        },
        date: "2017-12-03T18:30:00.000Z",
        amount: 300,
        __v: 0,
        dateString: "2017-12-04",
        id: "1215"
      }
    ]
  },
  {
    date: "2017-12-05",
    amount: 1500,
    invoices: [
      {
        _id: 1216,
        patient: {
          _id: 1003,
          name: "Apoorv Umang",
          age: 0,
          id: "1003"
        },
        date: "2017-12-04T18:30:00.000Z",
        amount: 500,
        __v: 0,
        dateString: "2017-12-05",
        id: "1216"
      },
      {
        _id: 1217,
        patient: {
          _id: 1007,
          name: "Deepak Agrawal",
          age: 0,
          id: "1007"
        },
        date: "2017-12-04T18:30:00.000Z",
        amount: 500,
        __v: 0,
        dateString: "2017-12-05",
        id: "1217"
      },
      {
        _id: 1218,
        patient: {
          _id: 1003,
          name: "Apoorv Umang",
          age: 0,
          id: "1003"
        },
        date: "2017-12-04T18:30:00.000Z",
        amount: 500,
        __v: 0,
        dateString: "2017-12-05",
        id: "1218"
      }
    ]
  },
  {
    date: "2017-12-06",
    amount: 1500,
    invoices: [
      {
        _id: 1219,
        patient: {
          _id: 1004,
          name: "Anurag Saxena",
          age: 0,
          id: "1004"
        },
        date: "2017-12-05T18:30:00.000Z",
        amount: 500,
        __v: 0,
        dateString: "2017-12-06",
        id: "1219"
      },
      {
        _id: 1220,
        patient: {
          _id: 1003,
          name: "Apoorv Umang",
          age: 0,
          id: "1003"
        },
        date: "2017-12-05T18:30:00.000Z",
        amount: 500,
        __v: 0,
        dateString: "2017-12-06",
        id: "1220"
      },
      {
        _id: 1221,
        patient: {
          _id: 1001,
          name: "Arpit Tarang Saxena",
          age: 0,
          id: "1001"
        },
        date: "2017-12-05T18:30:00.000Z",
        amount: 500,
        __v: 0,
        dateString: "2017-12-06",
        id: "1221"
      }
    ]
  },
  {
    date: "2017-12-07",
    amount: 1900,
    invoices: [
      {
        _id: 1222,
        patient: {
          _id: 1007,
          name: "Deepak Agrawal",
          age: 0,
          id: "1007"
        },
        date: "2017-12-06T18:30:00.000Z",
        amount: 300,
        __v: 0,
        dateString: "2017-12-07",
        id: "1222"
      },
      {
        _id: 1223,
        patient: {
          _id: 1010,
          name: "Saroj Kumar",
          age: 0,
          id: "1010"
        },
        date: "2017-12-06T18:30:00.000Z",
        amount: 300,
        __v: 0,
        dateString: "2017-12-07",
        id: "1223"
      },
      {
        _id: 1224,
        patient: {
          _id: 1004,
          name: "Anurag Saxena",
          age: 0,
          id: "1004"
        },
        date: "2017-12-06T18:30:00.000Z",
        amount: 500,
        __v: 0,
        dateString: "2017-12-07",
        id: "1224"
      },
      {
        _id: 1225,
        patient: {
          _id: 1002,
          name: "Arpit Saxena",
          age: 0,
          id: "1002"
        },
        date: "2017-12-06T18:30:00.000Z",
        amount: 300,
        __v: 0,
        dateString: "2017-12-07",
        id: "1225"
      },
      {
        _id: 1226,
        patient: {
          _id: 1005,
          name: "Arpit Tarang Saxena",
          age: 0,
          id: "1005"
        },
        date: "2017-12-06T18:30:00.000Z",
        amount: 500,
        __v: 0,
        dateString: "2017-12-07",
        id: "1226"
      }
    ]
  },
  {
    date: "2017-12-08",
    amount: 1600,
    invoices: [
      {
        _id: 1227,
        patient: {
          _id: 1001,
          name: "Arpit Tarang Saxena",
          age: 0,
          id: "1001"
        },
        date: "2017-12-07T18:30:00.000Z",
        amount: 300,
        __v: 0,
        dateString: "2017-12-08",
        id: "1227"
      },
      {
        _id: 1228,
        patient: {
          _id: 1007,
          name: "Deepak Agrawal",
          age: 0,
          id: "1007"
        },
        date: "2017-12-07T18:30:00.000Z",
        amount: 500,
        __v: 0,
        dateString: "2017-12-08",
        id: "1228"
      },
      {
        _id: 1229,
        patient: {
          _id: 1002,
          name: "Arpit Saxena",
          age: 0,
          id: "1002"
        },
        date: "2017-12-07T18:30:00.000Z",
        amount: 300,
        __v: 0,
        dateString: "2017-12-08",
        id: "1229"
      },
      {
        _id: 1230,
        patient: {
          _id: 1009,
          name: "Jamuna Das",
          age: 0,
          id: "1009"
        },
        date: "2017-12-07T18:30:00.000Z",
        amount: 500,
        __v: 0,
        dateString: "2017-12-08",
        id: "1230"
      }
    ]
  },
  {
    date: "2017-12-09",
    amount: 1400,
    invoices: [
      {
        _id: 1231,
        patient: {
          _id: 1010,
          name: "Saroj Kumar",
          age: 0,
          id: "1010"
        },
        date: "2017-12-08T18:30:00.000Z",
        amount: 300,
        __v: 0,
        dateString: "2017-12-09",
        id: "1231"
      },
      {
        _id: 1232,
        patient: {
          _id: 1005,
          name: "Arpit Tarang Saxena",
          age: 0,
          id: "1005"
        },
        date: "2017-12-08T18:30:00.000Z",
        amount: 300,
        __v: 0,
        dateString: "2017-12-09",
        id: "1232"
      },
      {
        _id: 1233,
        patient: {
          _id: 1001,
          name: "Arpit Tarang Saxena",
          age: 0,
          id: "1001"
        },
        date: "2017-12-08T18:30:00.000Z",
        amount: 300,
        __v: 0,
        dateString: "2017-12-09",
        id: "1233"
      },
      {
        _id: 1234,
        patient: {
          _id: 1005,
          name: "Arpit Tarang Saxena",
          age: 0,
          id: "1005"
        },
        date: "2017-12-08T18:30:00.000Z",
        amount: 500,
        __v: 0,
        dateString: "2017-12-09",
        id: "1234"
      }
    ]
  },
  {
    date: "2017-12-10",
    amount: 2300,
    invoices: [
      {
        _id: 1235,
        patient: {
          _id: 1004,
          name: "Anurag Saxena",
          age: 0,
          id: "1004"
        },
        date: "2017-12-09T18:30:00.000Z",
        amount: 500,
        __v: 0,
        dateString: "2017-12-10",
        id: "1235"
      },
      {
        _id: 1236,
        patient: {
          _id: 1010,
          name: "Saroj Kumar",
          age: 0,
          id: "1010"
        },
        date: "2017-12-09T18:30:00.000Z",
        amount: 300,
        __v: 0,
        dateString: "2017-12-10",
        id: "1236"
      },
      {
        _id: 1237,
        patient: {
          _id: 1009,
          name: "Jamuna Das",
          age: 0,
          id: "1009"
        },
        date: "2017-12-09T18:30:00.000Z",
        amount: 500,
        __v: 0,
        dateString: "2017-12-10",
        id: "1237"
      },
      {
        _id: 1238,
        patient: {
          _id: 1005,
          name: "Arpit Tarang Saxena",
          age: 0,
          id: "1005"
        },
        date: "2017-12-09T18:30:00.000Z",
        amount: 500,
        __v: 0,
        dateString: "2017-12-10",
        id: "1238"
      },
      {
        _id: 1239,
        patient: {
          _id: 1004,
          name: "Anurag Saxena",
          age: 0,
          id: "1004"
        },
        date: "2017-12-09T18:30:00.000Z",
        amount: 500,
        __v: 0,
        dateString: "2017-12-10",
        id: "1239"
      }
    ]
  }
];
export { defaultPatient, defaultPrescriptions, defaultVisits };
