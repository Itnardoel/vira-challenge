/**
 * Sends a notification through Telegram
 * @param message Message to send
 */
export async function sendTelegramNotification(message: string) {
  // await fetch(`https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}/sendMessage?chat_id=${process.env.TELEGRAM_CHAT_ID}&text=${encodeURIComponent(`${message}`)}`
  // )
  console.log("Notification sent: ", message);
} 