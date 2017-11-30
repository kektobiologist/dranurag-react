// seperate algolia servers for test and prod
export var AppID =
  process.env.NODE_ENV == "production" ? "1T0DWJW3ZN" : "SEB01ND0HI";
export var ClientKey =
  process.env.NODE_ENV == "production"
    ? "5ce22be0f0b05dd152bec330daa03a9b"
    : "f2f70b4ef7d07842cb66b86ee5319c9e";
