import collections
import json

def transformJsonToObject(a_json):
  keys = a_json.keys()
  values = a_json.values()

  def create_object(self):
    return collections.namedtuple('object_name', keys)(* values)

  an_object = json.loads(json.dumps(a_json), object_hook=create_object)
  return an_object
