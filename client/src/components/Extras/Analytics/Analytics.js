import ReactGA from 'react-ga';

function Analytics(){
ReactGA.pageview(window.location.pathname + window.location.search);
ReactGA.event({
    category: 'User',
    action: 'Sent message'
  });
ReactGA.initialize('UA-000000-01', {
    debug: true,
    titleCase: false,
    gaOptions: {
      userId: 123
    }
  });
   
  ReactGA.addTrackers(
    [
      {
        trackingId: 'UA-000000-01',
        gaOptions: {
          name: 'tracker1',
          userId: 123
        }
      },
      {
        trackingId: 'UA-000000-02',
        gaOptions: { name: 'tracker2' }
      }
    ],
    { debug: true, alwaysSendToDefaultTracker: false }
  );
  return (null);
}
export default Analytics;