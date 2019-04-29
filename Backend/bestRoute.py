import json
from sys import argv
import math
from itertools import permutations


def load_from_json(json_init):
    try:
        loads =  json.loads(json_init)
        orders = loads['orders']
        maxload = loads['maxload']
    except json.decoder.JSONDecodeError:
        return ([],0)
    except KeyError:
        return ([],0)

    if not isinstance(orders, list):
        return ([],0)
    for order in orders:
        if not ('x1' in order and 'x2' and 'y1' in order and 'y2' in order and 'load' in order):
            return ([],0)

    return (orders,maxload)

def encode_to_json(points,distance):
    if (not points) | (not distance):
        return json.dumps({'error':'invalid input'})
    return json.dumps({'points': points, 'distance': distance},sort_keys=True)

def get_action_points_from_orders(orders):
    action_points = []
    for order in orders:
        action_points.append({'x': order['x1'],'y': order['y1'],'value': order['load']})
        action_points.append({'x': order['x2'],'y': order['y2'],'value': -order['load']})
    return action_points

def evaluate_action_points(action_points,maxload):
    distance = 0

    current_load=0
    first = True
    current_position = (0,0)
    for action_point in action_points:
        current_load += action_point['value']
        if current_load<0 or current_load>maxload:
            return 0

        new_position = (action_point['x'], action_point['y'])
        if first:
            first = False
        else:
            distance += math.sqrt((new_position[0]-current_position[0])**2 + (new_position[1]-current_position[1])**2)
        current_position = new_position

    if(distance>0) :
        return 1/distance
    else:
        return 0


def calculate(orders,maxload):

    best_action_points=[]
    best_value=0
    action_points = get_action_points_from_orders(orders)
    action_points_permutations = permutations(action_points)

    #checking all possible scenarios
    for permutation in action_points_permutations:
        value = evaluate_action_points(permutation,maxload)
        if(value>best_value):
            best_action_points = permutation
            best_value = value

    #converting to visit_points(reducing multiple actions in one place and computing load of value)
    best_points = []
    current_load = 0
    total_distance = 0;
    last_appended_action_point = {};
    for i in range(len(best_action_points)):
        action_point = best_action_points[i]
        current_load += action_point['value']
        if (i + 1 < len(best_action_points)):
            next_action_point = best_action_points[i+1]
            if (action_point['x'] == next_action_point['x'] and action_point['y'] == next_action_point['y']):
                continue
        best_points.append({'x': action_point['x'], 'y': action_point['y'], 'load': current_load})
        if (i > 0):
            total_distance += math.sqrt((last_appended_action_point['x'] - action_point['x'])**2 + (last_appended_action_point['y'] - action_point['y'])**2)
        last_appended_action_point = action_point

    return (best_points,total_distance)

if __name__ == '__main__':
    (orders,maxload) = load_from_json(argv[1])
    (points,distance) = calculate(orders,maxload)
    print(encode_to_json(points,distance))