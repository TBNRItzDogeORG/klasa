const { Structures } = require("discord.js");
const KlasaGuildMemberStore = require("./KlasaGuildMemberStore");

module.exports = Structures.extend("Guild", (Guild) => {
  /**
   * Klasa's Extended Guild
   * @extends external:Guild
   */
  class KlasaGuild extends Guild {
    /**
     * @typedef {external:GuildJSON} KlasaGuildJSON
     * @property {SettingsJSON} settings The per guild settings
     */

    /**
     * @param {...*} args Normal D.JS Guild args
     */
    constructor(...args) {
      super(...args);

      /**
       * The guild level settings for this context (guild || default)
       * @since 0.5.0
       * @type {Settings}
       */
      this.settings = this.client.gateways.guilds.get(this.id, true);

      const { members } = {};

      /**
       * Storage for KlasaMembers
       * @since 0.0.1
       * @type {KlasaGuildMemberStore}
       */
      this.members = new KlasaGuildMemberStore(this, members);
    }

    /**
     * The language configured for this guild
     * @type {?Language}
     */
    get language() {
      return this.client.languages.get(this.settings.language) || null;
    }

    /**
     * Returns the JSON-compatible object of this instance.
     * @since 0.5.0
     * @returns {KlasaGuildJSON}
     */
    toJSON() {
      return { ...super.toJSON(), settings: this.settings.toJSON() };
    }
  }

  return KlasaGuild;
});
