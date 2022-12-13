const xml2js = require('xml2js');
const fs = require('fs');

function parse_json(path) {
    const data = require(path);
    return data;
}

function parse_xml(path) {

    const parser = new xml2js.Parser({ attrkey: "ATTR" });
    const data = fs.readFileSync(path, "utf8");
    const dataInJson = {}
    /*
    Reference on how XML file will be converted to js 
    {
      denmark_info: {
        country: [ 'Denmark' ],
        capital: [ 'Copenhagen' ],
        location: [ 'Europe' ],
        neighbouring_countries: [ { neighbouring_country: [ 'Germany', 'Sweden', 'Norway' ] } ],
        language: [ 'Danish' ],
        population: [ '5831000' ],
        area: [ '42951' ],
        part_of_eu: [ 'true' ]
      }
    }
    */
    // console.log("Content of the JSON file:")
    parser.parseString(data, (error, result) => {
        if (error === null) {
            const { breakfast_menu } = result
            console.log(result.breakfast_menu.food)
            for (const [key, value] of Object.entries(breakfast_menu)) {
                let value_in_str = ""
                if (typeof value[0] !== "string") {
                    const inner_array = Object.entries(value[0])
                    const [nested_key, nested_value] = inner_array[0]
                    value_in_str = nested_value.toString()
                } else {
                    value_in_str = value.toString()
                }
                console.log(`${key}: ${value_in_str}`);
                dataInJson[`${key}`] = value_in_str
            }
            
        }
        else {
            console.log(error);
        }
    });
    return dataInJson
}

exports.parse_json = parse_json;
exports.parse_xml = parse_xml;