const { Client, GatewayIntentBits } = require("discord.js");
const { joinVoiceChannel } = require("@discordjs/voice");

const TOKEN = "PUT_YOUR_TOKEN_HERE";
const VOICE_CHANNEL_ID = "1437339147076632616";

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildVoiceStates,
  ],
});

client.once("ready", async () => {
  console.log(`✅ Logged in as ${client.user.tag}`);

  try {
    const channel = await client.channels.fetch(VOICE_CHANNEL_ID);
    if (!channel) {
      console.log("❌ الروم غير موجود");
      return;
    }

    joinVoiceChannel({
      channelId: channel.id,
      guildId: channel.guild.id,
      adapterCreator: channel.guild.voiceAdapterCreator,
      // بدون ميوت ولا دفن (الافتراضي)
    });

    console.log("🎧 دخل الروم الصوتي الثابت");
  } catch (err) {
    console.error("❌ خطأ:", err);
  }
});

client.login(process.env.DISCORD_TOKEN);
