const xml2js = require('xml2js');
const fs = require('fs');

function parse_json(path) {
    const data = require(path);
    console.log("JSON:")
    for (const [key, value] of Object.entries(data)) {
        console.log(`${key}: ${value}`);
        console.log(key,value)
    }
}

function parse_xml(path) {

    const parser = new xml2js.Parser({ attrkey: "ATTR" });
    const data = fs.readFileSync(path, "utf8");
    
    console.log("XML:")
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
            }
            console.log()
        }
        else {
            console.log(error);
        }
    });
}

parse_json("../files/file.json");
parse_xml("../files/file.xml");