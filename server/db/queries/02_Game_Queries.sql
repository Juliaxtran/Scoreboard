---- most max wins and max losses in a group for a specific game --- 

--- most losses in a group for a specific game ---
select games.name,
 players.name, 
 count(CASE WHEN matches_players.is_winner THEN 1 END) as wins,   
    (select count(*)) - count(CASE WHEN matches_players.is_winner THEN 1 END) as losses
from games
join groups on games.group_id = groups.id
join matches on games.id = matches.game_id
join matches_players on matches.id = matches_players.match_id
join players on matches_players.player_id = players.id
where groups.id = 1
and games.name = 'Catan'
group by games.name, players.name
order by losses desc
limit 1
; 


-- most wins in a group for a specific game ---
select games.name,
 players.name, 
 count(CASE WHEN matches_players.is_winner THEN 1 END) as wins,   
    (select count(*)) - count(CASE WHEN matches_players.is_winner THEN 1 END) as losses
from games
join groups on games.group_id = groups.id
join matches on games.id = matches.game_id
join matches_players on matches.id = matches_players.match_id
join players on matches_players.player_id = players.id
where groups.id = 1
and games.id = 2
group by games.name, players.name
order by wins desc
limit 1
; 


-- select games.name,
--  players.name, 
--  count(matches_players.is_winner) as wins,   
--     (select count(*)) - count(matches_players.is_winner) as losses
-- from games 
-- join groups on games.group_id = groups.id
-- join matches on games.id = matches.game_id
-- join matches_players on matches.id = matches_players.match_id
-- join players on matches_players.player_id = players.id
-- where groups.id = 1
-- and games.name = 'Catan'
-- group by games.name, players.name
-- ; 