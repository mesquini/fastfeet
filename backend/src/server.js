import app from './index';

const port = process.env.PORT ? process.env.PORT : 3333;

app.listen(port, () => console.log(`listing port ${port}`));
