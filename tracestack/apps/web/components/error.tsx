import { logger } from '@tracestack/logging-sdk';

const projectId = 'cmcxotz2a0000c89xlhdwhatv';
if (!logger.isInitialized) {
  const TRACESTACK_API_URL = 'https://3000-ayonaim-tracestack-f31fzbgcmwo.ws-eu120.gitpod.io/api/logs';
  const TRACESTACK_PROJECT_ID = projectId;
  logger.init(TRACESTACK_API_URL, TRACESTACK_PROJECT_ID);
}

export default function ErrorComponent() {
  const handleErrorClick = () => {
    try {
      throw new Error("'This is a simulated error from the frontend!'");
    } catch (error) {
      console.log('an action has occured, type: error');
      logger.error("Frontend Error Caught", {
        error: error instanceof Error ? error.message : String(error),
        stack: error instanceof Error ? error.stack : undefined,
        component: 'ErrorComponent',
        userAction: 'button click'
      });
    }
  };

  const handleInfoClick = () => {
    console.log('an action has occured, type: info');
    logger.info('User clicked a button.', { buttonName: 'example button' })
  };

  return (
    <div className='gap-4 flex'>
      <button onClick={handleInfoClick} className='bg-red-500 p-10'>Log Info</button>
      <button onClick={handleErrorClick} className='bg-red-500 p-10'>Simulate Error</button>
    </div>
  );
}