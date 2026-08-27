import { ref } from 'vue';

const notification = ref({
  show: false,
  message: '',
  type: 'info' // 'info', 'error', 'success'
});

export const useNotification = () => {
  const notify = (message, type = 'info') => {
    notification.value = { show: true, message, type };
    setTimeout(() => {
      notification.value.show = false;
    }, 5000);
  };

  return {
    notification,
    notify
  };
};
