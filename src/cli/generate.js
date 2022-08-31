const fetchStats = require("../fetchers/stats-fetcher");
const renderStatsCard = require("../cards/stats-card");
const fs = require("fs");
const { ArgumentParser, ArgumentDefaultsHelpFormatter } = require('argparse')

function parseCli() {

  const statsParserName = 'stats';
  const parser = new ArgumentParser({description: 'Generate a card.', formatter_class: ArgumentDefaultsHelpFormatter})
  subparsers = parser.add_subparsers({dest: 'subparser', help: 'type of a card'})

  statsParser = subparsers.add_parser(statsParserName, {description: 'Github readme stats card.',
                                      formatter_class: ArgumentDefaultsHelpFormatter})
  statsParser.add_argument("username")
  statsParser.add_argument("--count-private", {action: 'store_true'})
  statsParser.add_argument("--count-all-commits", {action: 'store_true'})
  statsParser.add_argument("--show-icon", {action: 'store_true'})
  statsParser.add_argument("--hide-title", {action: 'store_true'})
  statsParser.add_argument("--hide-border", {action: 'store_true'})
  statsParser.add_argument("--hide-rank", {action: 'store_true'})
  statsParser.add_argument("--include-all-commits", {action: 'store_true'})
  statsParser.add_argument("--disable-animations", {action: 'store_true'})
  statsParser.add_argument("--hide", {nargs: "+", metavar: '<str>', help: "Hides the items from stats.", default: null})
  statsParser.add_argument("--line-height", {type: 'int', metavar: '<int>', default: 25, help: " "})
  statsParser.add_argument("--title-color", {metavar: '<str>', default: "#000000", help: " "})
  statsParser.add_argument("--icon-color", {metavar: '<str>', default: "#000000", help: " "})
  statsParser.add_argument("--text-color", {metavar: '<str>', default: "#000000", help: " "})
  statsParser.add_argument("--bg-color", {metavar: '<str>', default: "#000000", help: " "})
  statsParser.add_argument("--custom-title", {metavar: '<str>'})
  statsParser.add_argument("--border-radius", {metavar: '<str>', default: "1", help: " "})
  statsParser.add_argument("--border-color", {metavar: '<str>', default: "#000000", help: " "})
  statsParser.add_argument("--theme", {metavar: '<str>', default: "light", help: " "})
  statsParser.add_argument("--locale", {metavar: '<str>', default: "en", help: " "})
  
  const args = parser.parse_args()
  console.log(args)

  if (args.subparser == statsParserName) { // to be extended with other card types
    // run(args);
  }
}

const run = async (args) => {
  parseCli()
  
  // Retrieve stats
  const stats = await fetchStats(
    args.username,
    args.count_private,
    arhs.count_all_commits,
  );
  console.log(stats);

  // Create card
  const card = renderStatsCard(stats, {
    hide: args.hide,
    show_icons: args.show_icons,
    hide_title: args.hide_title,
    hide_border: args.hide_border,
    hide_rank: args.hide_rank,
    include_all_commits: args.include_all_commits,
    line_height: args.line_height,
    title_color: args.title_color,
    icon_color: args.icon_color,
    text_color: args.text_color,
    bg_color: args.bg_color,
    theme: args.theme,
    custom_title: args.custom_title,
    border_radius: args.border_radius,
    border_color: args.border_color,
    locale: args.locale.toLowerCase(),
    disable_animations: args.disable_animations,
  });
  console.log(card);

  // Save card
  if (!fs.existsSync("cards")) {
    fs.mkdirSync("cards");
  }
  fs.writeFileSync(`./cards/${username}.svg`, card);

  console.log("finish");
};

run()