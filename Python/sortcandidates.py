import json
from sys import argv
import math
import bestroute


def sort(orders,maxload,candidates):

    def tuple_third(tuple):
        return tuple[2]

    candidates_w_keys = []
    for candidate in candidates:
        new_bestroute = bestroute.calculate(orders+[candidate],maxload);
        (new_points,new_distance) = new_bestroute
        if(new_distance!=0):
            candidates_w_keys.append((candidate,new_bestroute,new_distance))
    return [{"candidate": candidate, "new_route": {"poins": new_points, "distance": new_distance}} for (candidate,(new_points,new_distance),key) in sorted(candidates_w_keys, key=tuple_third)]

def encode_to_json(sorted_candidates):
    if not sorted_candidates:
        return json.dumps({'error':'invalid input'})
    return json.dumps({'sorted_candidates': sorted_candidates},sort_keys=True)

def load_from_json(json_init):
    try:
        loads =  json.loads(json_init)
        orders = loads['orders']
        maxload = loads['maxload']
        candidates = loads['candidates']
    except json.decoder.JSONDecodeError:
        return ([],0,[])
    except KeyError:
        return ([],0,[])

    if not isinstance(orders, list):
        return ([],0,[])
    for order in orders:
        if not ('x1' in order and 'x2' in order and 'y1' in order and 'y2' in order and 'load' in order):
            return ([],0,[])
    if not isinstance(candidates, list):
        return ([],0,[])
    for candidate in candidates:
        if not ('x1' in candidate and 'x2' in candidate and 'y1' in candidate and 'y2' in candidate and 'load' in candidate):
            return ([],0,[])

    return (orders,maxload,candidates)

if __name__ == '__main__':

    (orders,maxload,candidates) = load_from_json('{"orders":[{"x1":21.018,"y1":52.2201,"x2":21.018,"y2":52.2201,"load":123}],"maxload":1000}')
    sorted_candidates = sort(orders,maxload,candidates)
    print(encode_to_json(sorted_candidates))