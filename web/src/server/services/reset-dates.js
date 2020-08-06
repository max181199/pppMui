const CronJob = require('cron').CronJob;
const resetUserDates = require('./../middlewares/requests/resetUserDates')

const resetDates = new CronJob('00 00 00 * * *', async() => {
  try {
    console.log('Dates reset');
    await resetUserDates();
  } catch (error) {
    console.log(error);
  }
});


module.exports = {
  resetDates
};
