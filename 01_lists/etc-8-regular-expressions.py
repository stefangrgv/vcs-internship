import re


def find_years_mentions():
    s = "Charles John Huffam Dickens (/ˈtʃɑrlz ˈdɪkɪnz/; \
    7 February 1812 – 9 June 1870) was an English writer and \
    social critic. He created some of the world's most memorable \
    fictional characters and is generally regarded as the greatest \
    novelist of the Victorian period.[1] During his life, his works \
    enjoyed unprecedented fame, and by the twentieth century his \
    literary genius was broadly acknowledged by critics and scholars. \
    His novels and short stories continue to be widely popular.[2][3] \
    Born in Portsmouth, England, Dickens was forced to leave school to \
    work in a factory when his father was thrown into debtors' prison. \
    Although he had little formal education, his early impoverishment \
    drove him to succeed. Over his career he edited a weekly journal for \
    20 years, wrote 15 novels, five novellas and hundreds of short stories \
    and non-fiction articles, lectured and performed extensively, was an \
    indefatigable letter writer, and campaigned vigorously for children's \
    rights, education, and other social reforms. Dickens sprang to fame \
    with the 1836 serial publication of The Pickwick Papers. Within a few \
    years he had become an international literary celebrity, famous for his \
    humour, satire, and keen observation of character and society. His \
    novels, most published in monthly or weekly instalments, pioneered the \
    serial publication of narrative fiction, which became the dominant \
    Victorian mode for novel publication.[4][5] The instalment format \
    allowed Dickens to evaluate his audience's reaction, and he often \
    modified his plot and character development based on such feedback.[5] \
    For example, when his wife's chiropodist expressed distress at the way \
    Miss Mowcher in David Copperfield seemed to reflect her disabilities, \
    Dickens went on to improve the character with positive features.[6] His \
    plots were carefully constructed, and Dickens often wove in elements \
    from topical events into his narratives.[7] Masses of the illiterate \
    poor chipped in ha'pennies to have each new monthly episode read to \
    them, opening up and inspiring a new class of readers.[8] Dickens was \
    regarded as the literary colossus of his age.[9] His 1843 novella, A \
    Christmas Carol, is one of the most influential works ever written, \
    and it remains popular and continues to inspire adaptations in every \
    artistic genre. Set in London and Paris, his 1859 novel, A Tale of Two \
    Cities, is the best selling novel of all time.[10] His creative genius \
    has been praised by fellow writers—from Leo Tolstoy to George Orwell \
    and G. K. Chesterton—for its realism, comedy, prose style, unique \
    characterisations, and social criticism. On the other hand Oscar Wilde, \
    Henry James and Virginia Woolf complained of a lack of psychological \
    depth, loose writing, and a vein of saccharine sentimentalism. The \
    term Dickensian is used to describe something that is reminiscent of \
    Dickens and his writings, such as poor social conditions or \
    comically repulsive characters.[11]"

    dickens_mentioned = re.findall('Dickens', s)
    print('Dickens mentioned %i times' % (len(dickens_mentioned)))
    years_mentioned = re.findall(r"\d{4}", s)
    print('Years mentioned: ', years_mentioned)
