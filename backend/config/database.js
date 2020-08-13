import mysql from 'mysql';

const bd = mysql.createConnection({
  host: `${process.env.MYSQL_HOST}`,
  user: `${process.env.MYSQL_USER}`,
  password: `${process.env.MYSQL_PASSWORD}`,
  database: 'ens',
});

bd.connect((err) => {
  if (err) console.log(err);
});

export default bd;
