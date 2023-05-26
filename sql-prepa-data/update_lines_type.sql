-- Insert of stops.transport_type = 'tram' for r.route_short_name = 1
update stops
set transport_type = 'navette'
where stop_id in (select s.stop_id
                  from stops s
                           join stop_times st on s.stop_id = st.stop_id
                           join trips t on st.trip_id = t.trip_id
                           join routes r on t.route_id = r.route_id
                  where r.route_short_name = 'NA');