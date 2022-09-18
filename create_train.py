import json

out = ""

units = frozenset(['teaspoon', 'teaspoons', 'tsp', 'tsps', 'tablespoon', 'tablespoons','tbsp', 'tbsps', 'cup', 'cups', 'lb', 'lbs', 'oz', 'ounce', 'ounces', 'to', 'or', 'about'])


with open('./recipes_raw_nosource_epi.json') as f:
    data = json.load(f)
    for d in data:
        d = data[d]
        if 'ingredients' not in d or 'title' not in d or 'instructions' not in d or len(d['ingredients']) == 0:
            continue
        ings = ""
        for ing in d['ingredients']:
            sing = ing.split(' ')

            while len(sing) > 0 and (len(sing[0]) == 0 or sing[0][0].isdigit() or sing[0].lower() in units):
                sing = sing[1:]
   
            if len(sing) == 0:
                continue

            ings += ' '.join(sing) + "\n"
        out += f"Ingredients: {ings}Title: {d['title']}\nInstructions: {d['instructions']}\n$SEP$\n"
    
with open('./out_data.txt', 'w') as f:
    f.write(out)

