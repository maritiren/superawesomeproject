module.exports.Categories = {
    AFK: 'Away From Keyboard',
    Crypto: 'Cryptography',
    Pwn: 'Binary Exploitation',
    RE: 'Reverse Engineering',
    Web: 'Web Security',
    Forensics: 'Forensics',
    Misc: 'Miscellaneous'
}

module.exports.jwtSecret = '55CCE41AF215358AE42C75745989BAFE33E48100791DG2F1F8BE3FA5654102AE';
module.exports.issuerDomain = 'api.superawesome.tghack.no';

module.exports.scopes = {
    ReadCategories: 'read:categories',
    ReadAwesomeHackers: 'read:awesomehackers',
    WriteAwesomeHackers: 'write:awesomehackers',
    ReadFlag: 'read:flag'
}
