use idioms_db;

insert into Languages
    (language_name, abbreviation, icon)
values
    -- 1
    ("English", "eng", "https://image.flaticon.com/icons/png/128/197/197374.png"),
    -- 2
    ("Spanish", "spa", "https://image.flaticon.com/icons/png/128/197/197593.png"),
    -- 3
    ("French", "fre", "https://image.flaticon.com/icons/png/128/197/197560.png"),
    -- 4
    ("Tagalog", "tgl", "https://image.flaticon.com/icons/png/128/197/197561.png"),
    -- 5
    ("Hebrew", "heb", "https://image.flaticon.com/icons/png/128/197/197577.png"),
    -- 6
    ("Chinese", "chi", "https://image.flaticon.com/icons/png/128/197/197375.png"),
    -- 7
    ("Hindi", "hin", "https://image.flaticon.com/icons/png/128/197/197419.png"),
    -- 8
    ("Portuguese", "por", "https://image.flaticon.com/icons/png/128/197/197386.png"),
    -- 9
    ("Bengali", "ben", "https://image.flaticon.com/icons/png/128/197/197509.png"),
    -- 10
    ("Russian", "rus", "https://image.flaticon.com/icons/png/128/197/197408.png"),
    -- 11
    ("Japanese", "jpn", "https://image.flaticon.com/icons/png/128/197/197604.png"),
    -- 12
    ("German", "ger", "https://image.flaticon.com/icons/png/128/197/197571.png"),
    -- 13
    ("Arabic", "ARB", "https://image.flaticon.com/icons/png/128/197/197558.png");


insert into Idioms
    (origin_idiom, pronunciation, literal_meaning, meaning, category, LanguageID)
values
    --  1
    ("Cry over spilled milk", "kray over spild milk", "Cry over spilled milk", "Express regret about something that has already happened or cannot be changed", "regret", 1),
    -- 2
    ("אֵין בּוֹכִים עַל חָלָב שֶׁנִּשְׁפַּךְ", "ein bo-chim al cha-lav she-nish-pach", "no crying over spilled milk", "You shouldnt be upset about something that has happened and is unchangeable anymore, like milk that has been spilled", "regret", 5),
    ("Huwag mong iyakan ang tumapon na gatas", "Hu-wag mong i-ya-kan a-ng tu-ma-pon nah ga-tas", "don't crying over spilled milk", "You cannot look back on something you cannot change", "regret", 4),
    --  3
    ("Put to shame", "put tu sheim", "Put to shame", "to cause to suffer shame or disgrace", "shame", 1),
    -- 4
    ("הלְבִּין פְּנֵיו בָּרַבִּים", "helbin panav be-rabim", "Bleached his face in the present of many", "To insulted one's friend in the presence of others, making his face pale (white) with shame", "shame", 5),
    -- 5
    ("Pahiya mo sya", "pah-hi-ya mo syah", "Put to shame", "to embarassed him", "shame", 4),
    --  6
    ("מַטְבְּע לָשׁוֹן", "matbe-a lashon", "Tongue's coin, Language currency", "Phrase or an idiom", "phrase", 5),
    --  7
    ("Ripe old age", "raɪp oʊld eɪʤ", "Ripe old age", "A very old age", "age", 1),
    -- 8
    ("בָּא בַּיָּמִים", "ba ba-yamim", "Come in Days", "Someone who lived for a lot of days - very old (from Genesis - the Bible)", "age", 5),
    -- 9
    ("Hinog na gulang", "Hi-nog na gu-lah-ng", "Ripe old age", "at the right age", "age", 4),
    -- 10
    ("Be of the same mind", "bi ʌv ðə seɪm maɪnd", "Be of the same mind", "To have the same opinion", "opinion", 1),
    -- 11
    ("תְּמִימוּת דֵּעִים", "tmimut de-im", "Opinions naivety", "Full consensus, unity of opinion (from Job - the Bible)", "opinion", 5),
    -- 12
    ("Parehong isipan", "Pa-re-hong i-si-pan", "Same thinking", "On the same page", "opinion", 4),
    --  13
    ("لا تبكى على اللبن المسكوب", "la tabkee 3ala allaban al maskoob", "Don't cry over spilled milk", "Express regret about something that has already happened or cannot be changed", "regret", 13),
    -- 14
    ("حاجة تفور الدم", "Haga tefawwar al-damm", "This thing causes blood to boil to the point of overflowing", "This is really very annoying", "anger annoy", 13),
    -- 15
    ("على حسابى", "Ala hesaby", "On my account", "I'll pay for this", "generosity pay responsibility", 13),
    -- 16
    ("It's on me", "It's on me", "It is on top of me", "I'll pay for this", "generosity pay responsibility", 1),
    -- 17
    ("تحت أمرك", "Taht amrak", "under your command", "I will do what you say", "obedience", 13),
    -- 18
    ("Your wish is my command", "your wish is my command", "I'll do whatever you say", "Being ready to do whatever they want", "obedience", 1);


INSERT INTO links
    (idiom1Id, idiom2Id, rating)
VALUES
    -- 1
    (1, 14, 0),
    -- 2
    (15, 16, 0),
    -- 3
    (18, 17, 0);