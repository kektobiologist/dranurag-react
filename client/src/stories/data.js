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

export { defaultPatient, defaultPrescriptions, defaultVisits };
